let produtos = [];
let produtoSelecionado = null;

const API_URL = "http://localhost:8080";

const nome = document.getElementById("nome");
const preco = document.getElementById("preco");
const quantidade = document.getElementById("quantidade");
const categoria = document.getElementById("categoria");
const fornecedor = document.getElementById("fornecedor");
const tabelaProdutos = document.getElementById("tabelaProdutos");

const botoes = document.querySelectorAll("input[type='button']");
const botaoCadastrar = botoes[0];
const botaoAtualizar = botoes[1];
const botaoExcluir = botoes[2];
const botaoLimpar = botoes[3];




async function carregarCategorias() {
    try {
        const resposta = await fetch(`${API_URL}/categorias`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar categorias.");
        }

        const categorias = await resposta.json();

        categoria.innerHTML =
            '<option value="">Selecione uma categoria</option>';

        categorias.forEach(cat => {
            const opcao = document.createElement("option");

            opcao.value = cat.idCategoria;
            opcao.textContent = cat.produtoCategoria;

            categoria.appendChild(opcao);
        });

    } catch (erro) {
        console.error(erro);
        alert("Erro ao carregar categorias.");
    }
}




async function carregarFornecedores() {
    try {
        const resposta = await fetch(`${API_URL}/fornecedores`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar fornecedores.");
        }

        const fornecedores = await resposta.json();

        fornecedor.innerHTML =
            '<option value="">Selecione um fornecedor</option>';

        fornecedores.forEach(forn => {
            const opcao = document.createElement("option");

            opcao.value = forn.idFornecedor;
            opcao.textContent = forn.nomeFornecedor;

            fornecedor.appendChild(opcao);
        });

    } catch (erro) {
        console.error(erro);
        alert("Erro ao carregar fornecedores.");
    }
}




async function carregarProdutos() {
    try {
        const resposta = await fetch(`${API_URL}/produtos`);

        if (!resposta.ok) {
            throw new Error("Erro ao carregar produtos.");
        }

        produtos = await resposta.json();

        mostrarProdutos();

    } catch (erro) {
        console.error(erro);
        alert("Erro ao carregar produtos.");
    }
}




function mostrarProdutos() {

    tabelaProdutos.innerHTML = "";

    produtos.forEach(produto => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.idProduto}</td>
            <td>${produto.nomeProduto}</td>
            <td>R$ ${Number(produto.preco).toFixed(2)}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.categoria?.produtoCategoria ?? ""}</td>
            <td>${produto.fornecedor?.nomeFornecedor ?? ""}</td>
        `;

        linha.addEventListener("click", function () {

            produtoSelecionado = produto.idProduto;

            nome.value = produto.nomeProduto;
            preco.value = produto.preco;
            quantidade.value = produto.quantidade;

            categoria.value =
                produto.categoria?.idCategoria ?? "";

            fornecedor.value =
                produto.fornecedor?.idFornecedor ?? "";
        });

        tabelaProdutos.appendChild(linha);
    });
}




botaoCadastrar.addEventListener("click", async function () {

    if (
        nome.value.trim() === "" ||
        preco.value.trim() === "" ||
        quantidade.value.trim() === "" ||
        categoria.value === "" ||
        fornecedor.value === ""
    ) {
        alert("Preencha todos os campos.");
        return;
    }

    const produto = {

        nomeProduto: nome.value,

        preco: parseFloat(preco.value),

        quantidade: parseInt(quantidade.value),

        categoria: {
            idCategoria: parseInt(categoria.value)
        },

        fornecedor: {
            idFornecedor: parseInt(fornecedor.value)
        }
    };

    try {

        const resposta = await fetch(`${API_URL}/produtos`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(produto)
        });

        if (!resposta.ok) {
            throw new Error("Erro ao cadastrar produto.");
        }

        await resposta.json();

        await carregarProdutos();

        limparFormulario();

        alert("Produto cadastrado com sucesso!");

    } catch (erro) {

        console.error(erro);

        alert("Erro ao cadastrar produto.");
    }
});




botaoAtualizar.addEventListener("click", async function () {

    if (produtoSelecionado === null) {

        alert("Selecione um produto na tabela.");

        return;
    }

    if (
        nome.value.trim() === "" ||
        preco.value.trim() === "" ||
        quantidade.value.trim() === "" ||
        categoria.value === "" ||
        fornecedor.value === ""
    ) {
        alert("Preencha todos os campos.");

        return;
    }

    const produto = {

        nomeProduto: nome.value,

        preco: parseFloat(preco.value),

        quantidade: parseInt(quantidade.value),

        categoria: {
            idCategoria: parseInt(categoria.value)
        },

        fornecedor: {
            idFornecedor: parseInt(fornecedor.value)
        }
    };

    try {

        const resposta = await fetch(
            `${API_URL}/produtos/${produtoSelecionado}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(produto)
            }
        );

        if (!resposta.ok) {
            throw new Error("Erro ao atualizar produto.");
        }

        await resposta.json();

        await carregarProdutos();

        limparFormulario();

        alert("Produto atualizado com sucesso!");

    } catch (erro) {

        console.error(erro);

        alert("Erro ao atualizar produto.");
    }
});




botaoExcluir.addEventListener("click", async function () {

    if (produtoSelecionado === null) {

        alert("Selecione um produto na tabela.");

        return;
    }

    const confirmar = confirm(
        "Deseja realmente excluir este produto?"
    );

    if (!confirmar) {
        return;
    }

    try {

        const resposta = await fetch(
            `${API_URL}/produtos/${produtoSelecionado}`,
            {
                method: "DELETE"
            }
        );

        if (!resposta.ok) {
            throw new Error("Erro ao excluir produto.");
        }

        await carregarProdutos();

        limparFormulario();

        alert("Produto excluído com sucesso!");

    } catch (erro) {

        console.error(erro);

        alert("Erro ao excluir produto.");
    }
});




function limparFormulario() {

    nome.value = "";

    preco.value = "";

    quantidade.value = "";

    categoria.value = "";

    fornecedor.value = "";

    produtoSelecionado = null;
}


botaoLimpar.addEventListener("click", function () {

    limparFormulario();

});




async function iniciar() {

    await carregarCategorias();

    await carregarFornecedores();

    await carregarProdutos();

}

iniciar();