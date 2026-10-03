/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.lojaweb.br.controller;

import com.lojaweb.br.model.Cliente;
import com.lojaweb.br.model.Funcionario;
import com.lojaweb.br.model.ItemVenda;
import com.lojaweb.br.model.Produto;
import com.lojaweb.br.model.Venda;
import com.lojaweb.br.repository.ClienteRepository;
import com.lojaweb.br.repository.FuncionarioRepository;
import com.lojaweb.br.repository.ItemVendaRepository;
import com.lojaweb.br.repository.ProdutoRepository;
import com.lojaweb.br.repository.VendaRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.stream.Collectors;
/**
 *
 * @author vitor
 */

@RestController
@RequestMapping("/vendas")
@CrossOrigin(origins = "*")
public class VendaController {
   
    @Autowired
    private VendaRepository vendaRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ItemVendaRepository itemVendaRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

   
    @GetMapping
    public List<Venda> listarVendas() {
        return vendaRepository.findAll();
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<Venda> buscarVenda(@PathVariable int id) {

        return vendaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    
    @PostMapping
    public Venda cadastrarVenda(@RequestBody Venda venda) {

       
        if (venda.getFuncionario() != null
                && venda.getFuncionario().getIdFuncionario() != null) {

            Funcionario funcionario = funcionarioRepository
                    .findById(venda.getFuncionario().getIdFuncionario())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Funcionário não encontrado"));

            venda.setFuncionario(funcionario);
        }

        
        if (venda.getCliente() != null
                && venda.getCliente().getIdCliente() != null) {

            Cliente cliente = clienteRepository
                    .findById(venda.getCliente().getIdCliente())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Cliente não encontrado"));

            venda.setCliente(cliente);
        }

        
        if (venda.getItens() != null) {

            List<ItemVenda> itens = venda.getItens()
                    .stream()
                    .map(item -> {

                        
                        Produto produto = produtoRepository
                                .findById(
                                        item.getProduto()
                                                .getIdProduto()
                                )
                                .orElseThrow(() ->
                                        new RuntimeException(
                                                "Produto não encontrado"));

                        
                        ItemVenda novoItem = new ItemVenda();

                        novoItem.setProduto(produto);
                        novoItem.setQuantidade(item.getQuantidade());
                        novoItem.setPreco_unitario(
                                item.getPreco_unitario()
                        );

                        return novoItem;
                    })
                    .collect(Collectors.toList());

            venda.setItens(itens);
        }

        
        return vendaRepository.save(venda);
    }

 
    @PutMapping("/{id}")
    public ResponseEntity<Venda> atualizarVenda(
            @PathVariable int id,
            @RequestBody Venda venda) {

        return vendaRepository.findById(id)
                .map(vendaExistente -> {

                    vendaExistente.setFormaDePagamento(
                            venda.getFormaDePagamento()
                    );

                    vendaExistente.setFuncionario(
                            venda.getFuncionario()
                    );

                    vendaExistente.setCliente(
                            venda.getCliente()
                    );

                    vendaExistente.setItens(
                            venda.getItens()
                    );

                    Venda atualizada =
                            vendaRepository.save(vendaExistente);

                    return ResponseEntity.ok(atualizada);
                })
                .orElse(ResponseEntity.notFound().build());
    }

  
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirVenda(
            @PathVariable int id) {

        if (!vendaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        vendaRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}
