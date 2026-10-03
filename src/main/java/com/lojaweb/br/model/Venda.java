/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.lojaweb.br.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author vitor
 */

@Entity
@Table(name = "venda")
public class Venda {
    
    @Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Integer idVenda;

private String formaDePagamento;

@ManyToOne
@JoinColumn(name = "id_funcionario")
private Funcionario funcionario;

@ManyToOne
@JoinColumn(name = "id_cliente")
private Cliente cliente;

  @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_venda")
    private List<ItemVenda> itens;


  public Venda(Integer idVenda,
                 String formaDePagamento,
                 Funcionario funcionario,
                 Cliente cliente,
                 List<ItemVenda> itens) {

        this.idVenda = idVenda;
        this.formaDePagamento = formaDePagamento;
        this.funcionario = funcionario;
        this.cliente = cliente;
        this.itens = itens;
    }

public Venda() {
    this.itens = new ArrayList<>();
}

public Integer getIdVenda() {
    return idVenda;
}

public void setIdVenda(Integer idVenda) {
    this.idVenda = idVenda;
}

public String getFormaDePagamento() {
    return formaDePagamento;
}

public void setFormaDePagamento(String formaDePagamento) {
    this.formaDePagamento = formaDePagamento;
}

public Funcionario getFuncionario() {
    return funcionario;
}

public void setFuncionario(Funcionario funcionario) {
    this.funcionario = funcionario;
}

public Cliente getCliente() {
    return cliente;
}

public void setCliente(Cliente cliente) {
    this.cliente = cliente;
}

public List<ItemVenda> getItens() {
    return itens;
}

public void setItens(List<ItemVenda> itens) {
    this.itens = itens;
}

public void adicionarItem(ItemVenda item) {
    itens.add(item);
}
      
}
