/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.lojaweb.br.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 *
 * @author vitor
 */

@Controller
public class PaginaControler {
     
 @GetMapping("/")
    public String inicio() {
        return "menu";
    }

    @GetMapping("/menu")
    public String menu() {
        return "menu";
    }

    @GetMapping("/categoria")
    public String categoria() {
        return "categoria";
    }

    @GetMapping("/produto")
    public String produto() {
        return "produto";
    }

    @GetMapping("/fornecedor")
    public String fornecedor() {
        return "fornecedor";
    }

    @GetMapping("/cliente")
    public String cliente() {
        return "cliente";
    }

    @GetMapping("/funcionario")
    public String funcionario() {
        return "funcionario";
    }

    @GetMapping("/venda")
    public String venda() {
        return "venda";
    }

    @GetMapping("/relatorio")
    public String relatorio() {
        return "relatorio";
    }

}
