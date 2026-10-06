/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.lojaweb.br;

import com.lojaweb.br.model.ItemVenda;
import com.lojaweb.br.model.Venda;
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;

/**
 *
 * @author vitor
 */
public class VendaTest {
      @Test
    public void deveCalcularTotalDaVenda() {

        ItemVenda item1 = new ItemVenda();
        item1.setQuantidade(2);
        item1.setPreco_unitario(50.0);

        ItemVenda item2 = new ItemVenda();
        item2.setQuantidade(1);
        item2.setPreco_unitario(30.0);

        Venda venda = new Venda();

        venda.adicionarItem(item1);
        venda.adicionarItem(item2);

        double resultado = venda.calcularTotal();

        assertEquals(130.0, resultado, 0.001);
    } 
}
