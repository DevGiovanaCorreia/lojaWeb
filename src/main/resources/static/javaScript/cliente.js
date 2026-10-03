let clientes = [];
let clienteSelecionado = null;

const API_URL = "http://localhost:8080";

const nome = document.getElementById("nome");
const cpf = document.getElementById("cpf");
const endereco = document.getElementById("endereco");
const telefone = document.getElementById("telefone");
const tabelaClientes = document.getElementById("tabelaClientes");

const botoes = document.querySelectorAll("input[type='button']");
const botaoCadastrar = botoes[0];
const botaoAtualizar = botoes[1];
const botaoExcluir = botoes[2];
const botaoLimpar = botoes[3];




async function carregarClientes() {
    try {
        const resposta = await fetch(`${API_URL}/clientes`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar clientes.");
        }

        clientes = await resposta.json();

        mostrarClientes();

    } catch (erro) {
        console.error(erro);
        alert("Erro ao carregar clientes.");
    }
}

function mostrarClientes() {
    tabelaClientes.innerHTML = "";

    clientes.forEach(cliente => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${cliente.idCliente}</td>
            <td>${cliente.nomeCliente}</td>
            <td>${cliente.cpf}</td>
            <td>${cliente.endereco}</td>
            <td>${cliente.telefone}</td>
        `;

        linha.addEventListener("click", function () {
            clienteSelecionado = cliente.idCliente;

            nome.value = cliente.nomeCliente;
            cpf.value = cliente.cpf;
            endereco.value = cliente.endereco;
            telefone.value = cliente.telefone;
        });

        tabelaClientes.appendChild(linha);
    });
}


botaoCadastrar.addEventListener("click", async function () {

    if (
        nome.value.trim() === "" ||
        cpf.value.trim() === "" ||
        endereco.value.trim() === "" ||
        telefone.value === "" 
    ) {
        alert("Preencha todos os campos.");
        return;
    }

    const cliente = {
    nomeCliente: nome.value,
    cpf: cpf.value,
    endereco: endereco.value,
    telefone: telefone.value
};

    try {

        const resposta = await fetch(`${API_URL}/clientes`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(cliente)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar cliente.");
        }

        await resposta.json();

        await carregarClientes();

        limparFormulario();

        alert("Cliente cadastrado com sucesso!");

    } catch (erro) {

        console.error(erro);

        alert("Erro ao cadastrar cliente.");
    }
});




botaoAtualizar.addEventListener("click", async function () {

    if (clienteSelecionado === null) {

        alert("Selecione um cliente na tabela.");

        return;
    }

    if (
        nome.value.trim() === "" ||
        cpf.value.trim() === "" ||
        endereco.value.trim() === "" ||
        telefone.value === "" 
        
    ) {
        alert("Preencha todos os campos.");

        return;
    }

   const cliente = {
    nomeCliente: nome.value,
    cpf: cpf.value,
    endereco: endereco.value,
    telefone: telefone.value
};

    try {

        const resposta = await fetch(
            `${API_URL}/clientes/${clienteSelecionado}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(cliente)
            }
        );

        if (!resposta.ok) {
            throw new Error("Erro ao atualizar cliente.");
        }

        await resposta.json();

        await carregarClientes();

        limparFormulario();

        alert("Cliente atualizado com sucesso!");

    } catch (erro) {

        console.error(erro);

        alert("Erro ao atualizar cliente.");
    }
});




botaoExcluir.addEventListener("click", async function () {

    if (clienteSelecionado === null) {

        alert("Selecione um cliente na tabela.");

        return;
    }

    const confirmar = confirm(
        "Deseja realmente excluir este cliente?"
    );

    if (!confirmar) {
        return;
    }

    try {

        const resposta = await fetch(
            `${API_URL}/clientes/${clienteSelecionado}`,
            {
                method: "DELETE"
            }
        );

        if (!resposta.ok) {
            throw new Error("Erro ao excluir cliente.");
        }

        await carregarClientes();

        limparFormulario();

        alert("Cliente excluído com sucesso!");

    } catch (erro) {

        console.error(erro);

        alert("Erro ao excluir cliente.");
    }
});




function limparFormulario() {

    nome.value = "";

    cpf.value = "";

    endereco.value = "";

    telefone.value = "";

   

    clienteSelecionado = null;
}


botaoLimpar.addEventListener("click", function () {

    limparFormulario();

});




async function iniciar() {
    await carregarClientes();
}

iniciar();