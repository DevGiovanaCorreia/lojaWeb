let funcionarios = [];
let funcionarioSelecionado = null;

const API_URL = "http://localhost:8080";

const nome = document.getElementById("nome");
const cpf = document.getElementById("cpf");
const tabelaFuncionarios = document.getElementById("tabelaFuncionarios");

const botoes = document.querySelectorAll("input[type='button']");
const botaoCadastrar = botoes[0];
const botaoAtualizar = botoes[1];
const botaoExcluir = botoes[2];
const botaoLimpar = botoes[3];




async function carregarFuncionarios() {

    try {

        const resposta = await fetch(`${API_URL}/funcionarios`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar funcionários.");
        }

        funcionarios = await resposta.json();

        mostrarFuncionarios();

    } catch (erro) {

        console.error(erro);
        alert("Erro ao carregar funcionários.");

    }
}




function mostrarFuncionarios() {

    tabelaFuncionarios.innerHTML = "";

    funcionarios.forEach(funcionario => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${funcionario.idFuncionario}</td>
            <td>${funcionario.nomeFuncionario}</td>
            <td>${funcionario.cpf}</td>
        `;

        linha.addEventListener("click", function () {

            funcionarioSelecionado = funcionario.idFuncionario;

            nome.value = funcionario.nomeFuncionario;
            cpf.value = funcionario.cpf;

        });

        tabelaFuncionarios.appendChild(linha);

    });
}




botaoCadastrar.addEventListener("click", async function () {

    if (
        nome.value.trim() === "" ||
        cpf.value.trim() === ""
    ) {

        alert("Preencha todos os campos.");

        return;
    }

    const funcionario = {

        nomeFuncionario: nome.value.trim(),
        cpf: cpf.value.trim()

    };

    try {

        const resposta = await fetch(`${API_URL}/funcionarios`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(funcionario)

        });

        if (!resposta.ok) {

            throw new Error("Erro ao cadastrar funcionário.");

        }

        await resposta.json();

        await carregarFuncionarios();

        limparFormulario();

        alert("Funcionário cadastrado com sucesso!");

    } catch (erro) {

        console.error(erro);

        alert("Erro ao cadastrar funcionário.");

    }

});




botaoAtualizar.addEventListener("click", async function () {

    if (funcionarioSelecionado === null) {

        alert("Selecione um funcionário na tabela.");

        return;
    }

    if (
        nome.value.trim() === "" ||
        cpf.value.trim() === ""
    ) {

        alert("Preencha todos os campos.");

        return;
    }

    const funcionario = {

        nomeFuncionario: nome.value.trim(),
        cpf: cpf.value.trim()

    };

    try {

        const resposta = await fetch(
            `${API_URL}/funcionarios/${funcionarioSelecionado}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(funcionario)
            }
        );

        if (!resposta.ok) {

            throw new Error("Erro ao atualizar funcionário.");

        }

        await resposta.json();

        await carregarFuncionarios();

        limparFormulario();

        alert("Funcionário atualizado com sucesso!");

    } catch (erro) {

        console.error(erro);

        alert("Erro ao atualizar funcionário.");

    }

});




botaoExcluir.addEventListener("click", async function () {

    if (funcionarioSelecionado === null) {

        alert("Selecione um funcionário na tabela.");

        return;
    }

    const confirmar = confirm(
        "Deseja realmente excluir este funcionário?"
    );

    if (!confirmar) {

        return;
    }

    try {

        const resposta = await fetch(
            `${API_URL}/funcionarios/${funcionarioSelecionado}`,
            {
                method: "DELETE"
            }
        );

        if (!resposta.ok) {

            throw new Error("Erro ao excluir funcionário.");

        }

        limparFormulario();

        await carregarFuncionarios();

        alert("Funcionário excluído com sucesso!");

    } catch (erro) {

        console.error(erro);

        alert("Erro ao excluir funcionário.");

    }

});




function limparFormulario() {

    nome.value = "";
    cpf.value = "";

    funcionarioSelecionado = null;

}

botaoLimpar.addEventListener("click", function () {

    limparFormulario();

});




async function iniciar() {

    await carregarFuncionarios();

}

iniciar();