let categorias = [];

let categoriaSelecionada = null;

const API_URL = "http://localhost:8080";

const nome = document.getElementById("nome");

const tabelaCategoria = document.getElementById("tabelaCategoria");

const botoes = document.querySelectorAll(
"input[type='button']"
);

const botaoCadastrar = botoes[0];

const botaoAtualizar = botoes[1];

const botaoExcluir = botoes[2];

const botaoLimpar = botoes[3];


async function carregarCategorias() {

try {

    const resposta = await fetch(
        `${API_URL}/categorias`
    );

    if (!resposta.ok) {

        throw new Error(
            "Erro ao carregar categorias."
        );

    }

    categorias = await resposta.json();

    mostrarCategorias();

} catch (erro) {

    console.error(erro);

    alert("Erro ao carregar categorias.");

}

}


function mostrarCategorias() {

tabelaCategoria.innerHTML = "";

categorias.forEach(categoria => {

    const linha = document.createElement("tr");

    linha.innerHTML = `
        <td>${categoria.idCategoria}</td>
        <td>${categoria.produtoCategoria}</td>
    `;


    
    linha.addEventListener(
        "click",
        function () {

            categoriaSelecionada =
                categoria.idCategoria;

            nome.value =
                categoria.produtoCategoria;

        }
    );


    tabelaCategoria.appendChild(linha);

});

}


botaoCadastrar.addEventListener(
"click",
async function () {

    if (nome.value.trim() === "") {

        alert(
            "Preencha o nome da categoria."
        );

        return;

    }


    const categoria = {

        produtoCategoria:
            nome.value.trim()

    };


    try {

        const resposta = await fetch(
            `${API_URL}/categorias`,
            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify(categoria)

            }
        );


        if (!resposta.ok) {

            throw new Error(
                "Erro ao cadastrar categoria."
            );

        }


        await resposta.json();


        await carregarCategorias();

        limparFormulario();


        alert(
            "Categoria cadastrada com sucesso!"
        );


    } catch (erro) {

        console.error(erro);

        alert(
            "Erro ao cadastrar categoria."
        );

    }

}

);


botaoAtualizar.addEventListener(
"click",
async function () {

    if (categoriaSelecionada === null) {

        alert(
            "Selecione uma categoria na tabela."
        );

        return;

    }


    if (nome.value.trim() === "") {

        alert(
            "Preencha o nome da categoria."
        );

        return;

    }


    const categoria = {

        produtoCategoria:
            nome.value.trim()

    };


    try {

        const resposta = await fetch(

            `${API_URL}/categorias/${categoriaSelecionada}`,

            {

                method: "PUT",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify(categoria)

            }

        );


        if (!resposta.ok) {

            throw new Error(
                "Erro ao atualizar categoria."
            );

        }


        await resposta.json();


        await carregarCategorias();

        limparFormulario();


        alert(
            "Categoria atualizada com sucesso!"
        );


    } catch (erro) {

        console.error(erro);

        alert(
            "Erro ao atualizar categoria."
        );

    }

}

);


botaoExcluir.addEventListener(
"click",
async function () {

    if (categoriaSelecionada === null) {

        alert(
            "Selecione uma categoria na tabela."
        );

        return;

    }


    const confirmar = confirm(
        "Deseja realmente excluir esta categoria?"
    );


    if (!confirmar) {

        return;

    }


    try {

        const resposta = await fetch(

            `${API_URL}/categorias/${categoriaSelecionada}`,

            {

                method: "DELETE"

            }

        );


        if (!resposta.ok) {

            throw new Error(
                "Erro ao excluir categoria."
            );

        }


        await carregarCategorias();

        limparFormulario();


        alert(
            "Categoria excluída com sucesso!"
        );


    } catch (erro) {

        console.error(erro);

        alert(
            "Erro ao excluir categoria."
        );

    }

}

);


function limparFormulario() {

nome.value = "";

categoriaSelecionada = null;

}

botaoLimpar.addEventListener(
"click",
function () {

    limparFormulario();

}

);


async function iniciar() {

await carregarCategorias();

}

iniciar();