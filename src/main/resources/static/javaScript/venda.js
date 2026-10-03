let produtos = [];
let itensVenda = [];
const API_URL = "http://localhost:8080"; 


const funcionario = document.getElementById("funcionario"); 
const cliente = document.getElementById("cliente");
const produto = document.getElementById("produto"); 
const quantidade = document.getElementById("quantidade"); 
const pagamento = document.getElementById("pagamento"); 
const tabelaVenda = document.getElementById("tabelaVenda"); 
const totalElemento = document.getElementById("total"); 
const botaoAdicionar = document.getElementById("botaoAdicionar"); 
const botaoFinalizar = document.getElementById("botaoFinalizar"); 
const botaoCancelar = document.getElementById("botaoCancelar"); 


 async function carregarFuncionarios() { 
     
     try { const resposta = await fetch(`${API_URL}/funcionarios`); 
         
         if (!resposta.ok) { throw new Error("Erro ao carregar funcionários."); 
         } 
         const funcionarios = await resposta.json(); funcionario.innerHTML =
                
                 '<option value="">Selecione um funcionário</option>'; 
         funcionarios.forEach(func => { const opcao = document.createElement("option"); 
             
             opcao.value = func.idFuncionario; opcao.textContent = func.nomeFuncionario; 
             
             funcionario.appendChild(opcao); }); 
     } catch (erro)
     
     { 
         console.error("Erro ao carregar funcionários:", erro); alert("Não foi possível carregar os funcionários."); } } 

async function carregarClientes() { 
    try 
    { const resposta = await fetch(`${API_URL}/clientes`);
        
        if (!resposta.ok) { 
            throw new Error("Erro ao carregar clientes.");
        } 
        const clientes = await resposta.json(); cliente.innerHTML = '<option value="">Selecione um cliente</option>';
        
        clientes.forEach(cli => { const opcao = document.createElement("option"); opcao.value = cli.idCliente;
            
            opcao.textContent = cli.nomeCliente; cliente.appendChild(opcao); 
        });
    } catch (erro) { 
        
        console.error("Erro ao carregar clientes:", erro); 
        
        alert("Não foi possível carregar os clientes."); } 
} 


async function carregarProdutos() {
    
    try { const resposta = await fetch(`${API_URL}/produtos`); 
        
        if (!resposta.ok) { throw new Error("Erro ao carregar produtos."); }
        
        produtos = await resposta.json(); produto.innerHTML = '<option value="">Selecione um produto</option>'; 
        
        produtos.forEach(prod => {
            
            const opcao = document.createElement("option"); 
            
            opcao.value = prod.idProduto; 
            
            opcao.textContent = `${prod.nomeProduto} - R$ ${Number(prod.preco).toFixed(2)}`;
            
            produto.appendChild(opcao); }); 
    } 
    catch (erro) { console.error("Erro ao carregar produtos:", erro);
        
        alert("Não foi possível carregar os produtos."); } } 


function adicionarItem() { const idProduto = Number(produto.value);
    
    const qtd = Number(quantidade.value); 
    
    if (!idProduto || !Number.isInteger(qtd) || qtd <= 0) 
    
    { alert("Selecione um produto e informe uma quantidade válida."); return; } 
    
    
    const prod = produtos.find( p => p.idProduto === idProduto );
    
    if (!prod) { alert("Produto não encontrado."); return; }
    
    const itemExistente = itensVenda.find( item => item.id === idProduto );
    
    const quantidadeAtual = itemExistente ? itemExistente.quantidade : 0;
    
    if (quantidadeAtual + qtd > Number(prod.quantidade)) { alert( `Estoque insuficiente. Disponível: ${prod.quantidade} unidade(s).` );
        
        
        
        return; } if (itemExistente) { itemExistente.quantidade += qtd; } 
    
    else { itensVenda.push({ id: prod.idProduto, 
            nome: prod.nomeProduto, 
            preco: Number(prod.preco), 
            quantidade: qtd }); }
    
    mostrarItens(); produto.value = ""; quantidade.value = "";
} 



function mostrarItens() {
    tabelaVenda.innerHTML = ""; let total = 0;
    itensVenda.forEach(item => {
        const subtotal = item.preco * item.quantidade; total += subtotal; 
        
        const linha = document.createElement("tr"); linha.innerHTML = 
                ` <td>${item.id}</td>
                 <td>${item.nome}</td>
               <td>R$ ${item.preco.toFixed(2)}</td> 
               <td>${item.quantidade}</td> `;
        
        tabelaVenda.appendChild(linha);
    });
    
    totalElemento.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`; 

}  


async function salvarVenda() {

    if (!funcionario.value) {
        alert("Selecione um funcionário.");
        return;
    }

    if (!cliente.value) {
        alert("Selecione um cliente.");
        return;
    }

    if (!pagamento.value) {
        alert("Selecione a forma de pagamento.");
        return;
    }

    if (itensVenda.length === 0) {
        alert("Adicione pelo menos um produto.");
        return;
    }

    const venda = {
        formaDePagamento: pagamento.value,

        funcionario: {
            idFuncionario: Number(funcionario.value)
        },

        cliente: {
            idCliente: Number(cliente.value)
        },

        itens: itensVenda.map(item => ({
            produto: {
                idProduto: item.id
            },
            quantidade: item.quantidade,
            preco_unitario: item.preco
        }))
    };

    console.log("Venda enviada:", venda);

    try {

        const resposta = await fetch(`${API_URL}/vendas`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(venda)
        });

        if (!resposta.ok) {

            const erro = await resposta.text();

            console.error("Erro retornado pelo servidor:", erro);

            alert("Erro ao salvar venda. Confira o console do navegador e o NetBeans.");

            return;
        }

        alert("Venda realizada com sucesso!");

        limparVenda();

        
        await carregarProdutos();

    } catch (erro) {

        console.error("Erro ao salvar venda:", erro);

        alert("Não foi possível conectar ao servidor.");
    }
}
 
 
 



















 









 // =============================== // LIMPAR / CANCELAR VENDA // =============================== 
 // 
 function limparVenda() { funcionario.value = "";
     cliente.value = "";
     produto.value = ""; 
     quantidade.value = "";
     pagamento.value = "";
     itensVenda = []; mostrarItens(); } 
 //// =============================== // EVENTOS DOS BOTÕES // =============================== 
 //
 botaoAdicionar.addEventListener("click", adicionarItem); 
 botaoFinalizar.addEventListener("click", salvarVenda); 
 botaoCancelar.addEventListener("click", function () {
     if (itensVenda.length > 0) { 
         const confirmar = confirm("Deseja cancelar esta venda?");
         if (!confirmar) { return; } } limparVenda(); });
 // =============================== // INICIAR PÁGINA // =============================== 
 // 
 async function iniciar()
 { await carregarFuncionarios(); 
     await carregarClientes();
     await carregarProdutos(); 
     mostrarItens();
 } iniciar();