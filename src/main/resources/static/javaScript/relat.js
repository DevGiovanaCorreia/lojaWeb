let vendas = [];

const API_URL = "http://localhost:8080";

const funcionario = document.getElementById("funcionario");

async function carregarFuncionarios() {

    const resposta = await fetch(`${API_URL}/funcionarios`);

    if (!resposta.ok) {
        alert("Erro ao carregar funcionários.");
        return;
    }

    const funcionarios = await resposta.json();

    funcionario.innerHTML = `
        <option value="">Todos</option>
    `;

    funcionarios.forEach(func => {

        const opcao = document.createElement("option");

        opcao.value = func.idFuncionario;
        opcao.textContent = func.nomeFuncionario;

        funcionario.appendChild(opcao);
    });
}

async function carregarVendas() {

    const resposta = await fetch(`${API_URL}/vendas`);

    if (!resposta.ok) {
        alert("Erro ao carregar vendas.");
        return;
    }

    vendas = await resposta.json();

    mostrarRelatorio();
}

function mostrarRelatorio() {

    const tabela = document.getElementById("tabelaRelatorio");

    tabela.innerHTML = "";

    const funcionarioSelecionado = funcionario.value;

    let totalGeral = 0;

    const vendasFiltradas = vendas.filter(venda => {

        if (!funcionarioSelecionado) {
            return true;
        }

        return venda.funcionario &&
            venda.funcionario.idFuncionario ===
            Number(funcionarioSelecionado);
    });

    vendasFiltradas.forEach(venda => {

        let totalVenda = 0;

        if (venda.itens) {

            venda.itens.forEach(item => {

                const preco = Number(item.preco_unitario || 0);
                const qtd = Number(item.quantidade || 0);

                totalVenda += preco * qtd;
            });
        }

        totalGeral += totalVenda;

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${venda.idVenda}</td>

            <td>
                ${venda.cliente?.nomeCliente ?? ""}
            </td>

            <td>
                ${venda.funcionario?.nomeFuncionario ?? ""}
            </td>

            <td>
                ${venda.formaDePagamento ?? ""}
            </td>

            <td>
                R$ ${totalVenda.toFixed(2)}
            </td>
        `;

        tabela.appendChild(linha);
    });

    const total = document.getElementById("total");

    if (total) {

        total.textContent =
            `Total do dia: R$ ${totalGeral.toFixed(2)}`;
    }
}

function iniciar() {

    carregarFuncionarios();
    carregarVendas();

}

funcionario.addEventListener(
    "change",
    mostrarRelatorio
);

iniciar();