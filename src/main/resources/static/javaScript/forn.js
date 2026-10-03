let fornecedores = [];
let fornecedorSelecionado = null;

const API_URL = "http://localhost:8080";

const nome = document.getElementById("nome");
const cnpj = document.getElementById("cnpj");
const tabelaFornecedores = document.getElementById("tabelaFornecedores");

const botoes = document.querySelectorAll("input[type='button']");
const botaoCadastrar = botoes[0];
const botaoAtualizar = botoes[1];
const botaoExcluir = botoes[2];
const botaoLimpar = botoes[3];




async function carregarFornecedores() {

    try {

        const resposta = await fetch(`${API_URL}/fornecedores`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar fornecedores.");
        }

        fornecedores = await resposta.json();

        mostrarFornecedores();

    } catch (erro) {

        console.error(erro);
        alert("Erro ao carregar fornecedores.");
    }
}




function mostrarFornecedores() {

    tabelaFornecedores.innerHTML = "";

    fornecedores.forEach(fornecedor => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${fornecedor.idFornecedor}</td>
            <td>${fornecedor.nomeFornecedor}</td>
            <td>${fornecedor.cnpj}</td>
        `;

        linha.addEventListener("click", function () {

            fornecedorSelecionado = fornecedor.idFornecedor;

            nome.value = fornecedor.nomeFornecedor;
            cnpj.value = fornecedor.cnpj;

        });

        tabelaFornecedores.appendChild(linha);
    });
}




botaoCadastrar.addEventListener("click", async function () {

    if (
        nome.value.trim() === "" ||
        cnpj.value.trim() === ""
    ) {

        alert("Preencha todos os campos.");

        return;
    }

    const fornecedor = {

        nomeFornecedor: nome.value.trim(),
        cnpj: cnpj.value.trim()

    };

    try {

        const resposta = await fetch(`${API_URL}/fornecedores`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(fornecedor)

        });

        if (!resposta.ok) {

            throw new Error("Erro ao cadastrar fornecedor.");

        }

        await resposta.json();

        await carregarFornecedores();

        limparFormulario();

        alert("Fornecedor cadastrado com sucesso!");

    } catch (erro) {

        console.error(erro);

        alert("Erro ao cadastrar fornecedor.");

    }

});




botaoAtualizar.addEventListener("click", async function () {

    if (fornecedorSelecionado === null) {

        alert("Selecione um fornecedor na tabela.");

        return;
    }

    if (
        nome.value.trim() === "" ||
        cnpj.value.trim() === ""
    ) {

        alert("Preencha todos os campos.");

        return;
    }

    const fornecedor = {

        nomeFornecedor: nome.value.trim(),
        cnpj: cnpj.value.trim()

    };

    try {

        const resposta = await fetch(
            `${API_URL}/fornecedores/${fornecedorSelecionado}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(fornecedor)
            }
        );

        if (!resposta.ok) {

            throw new Error("Erro ao atualizar fornecedor.");

        }

        await resposta.json();

        await carregarFornecedores();

        limparFormulario();

        alert("Fornecedor atualizado com sucesso!");

    } catch (erro) {

        console.error(erro);

        alert("Erro ao atualizar fornecedor.");

    }

});




botaoExcluir.addEventListener("click", async function () {

    if (fornecedorSelecionado === null) {

        alert("Selecione um fornecedor na tabela.");

        return;
    }

    const confirmar = confirm(
        "Deseja realmente excluir este fornecedor?"
    );

    if (!confirmar) {

        return;
    }

    try {

        const resposta = await fetch(
            `${API_URL}/fornecedores/${fornecedorSelecionado}`,
            {
                method: "DELETE"
            }
        );

        if (!resposta.ok) {

            throw new Error("Erro ao excluir fornecedor.");

        }

        limparFormulario();

        await carregarFornecedores();

        alert("Fornecedor excluído com sucesso!");

    } catch (erro) {

        console.error(erro);

        alert("Erro ao excluir fornecedor.");

    }

});




function limparFormulario() {

    nome.value = "";
    cnpj.value = "";

    fornecedorSelecionado = null;

}

botaoLimpar.addEventListener("click", function () {

    limparFormulario();

});




async function iniciar() {

    await carregarFornecedores();

}

iniciar();