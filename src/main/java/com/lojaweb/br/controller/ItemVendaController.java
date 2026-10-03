/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.lojaweb.br.controller;

import com.lojaweb.br.model.ItemVenda;
import com.lojaweb.br.repository.ItemVendaRepository;
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

/**
 *
 * @author vitor
 */

@RestController
@RequestMapping("/itens-venda")
@CrossOrigin(origins = "*")
public class ItemVendaController {
     @Autowired
    private ItemVendaRepository itemVendaRepository;

    @GetMapping
    public List<ItemVenda> listarItens() {
        return itemVendaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemVenda> buscarItem(@PathVariable int id) {

        return itemVendaRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ItemVenda cadastrarItem(@RequestBody ItemVenda itemVenda) {
        return itemVendaRepository.save(itemVenda);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ItemVenda> atualizarItem(
            @PathVariable int id,
            @RequestBody ItemVenda itemVenda) {

        return itemVendaRepository.findById(id)
                .map(itemExistente -> {

                    itemExistente.setProduto(itemVenda.getProduto());
                    itemExistente.setQuantidade(itemVenda.getQuantidade());
                    itemExistente.setPreco_unitario(
                            itemVenda.getPreco_unitario()
                    );

                    ItemVenda atualizado =
                            itemVendaRepository.save(itemExistente);

                    return ResponseEntity.ok(atualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirItem(@PathVariable int id) {

        if (!itemVendaRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        itemVendaRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}
