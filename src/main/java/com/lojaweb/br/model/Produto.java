/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.lojaweb.br.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 *
 * @author vitor
 */

@Entity
@Table(name = "produtos")
public class Produto {
    
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
       private Integer idProduto;
    private String nomeProduto;
    private Double preco;
    private Integer quantidade;
    
    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;
    
    
    @ManyToOne
    @JoinColumn(name = "id_fornecedor")
    private Fornecedor fornecedor;
    
    
    public Produto(Integer idProduto,String nomeProduto,Double preco,Integer quantidade, Categoria categoria, Fornecedor fornecedor){
        this.idProduto=idProduto;
        this.nomeProduto=nomeProduto;
        this.preco=preco;
        this.quantidade=quantidade;
        this.categoria=categoria;
        this.fornecedor=fornecedor;
    } 
    
    
    public Produto(){
        
    }

   

    public Integer getIdProduto() {
    return idProduto;
}

public void setIdProduto(Integer idProduto) {
    this.idProduto = idProduto;
}

public String getNomeProduto() {
    return nomeProduto;
}

public void setNomeProduto(String nomeProduto) {
    this.nomeProduto = nomeProduto;
}

public Double getPreco() {
    return preco;
}

public void setPreco(Double preco) {
    this.preco = preco;
}

public Integer getQuantidade() {
    return quantidade;
}

public void setQuantidade(Integer quantidade) {
    this.quantidade = quantidade;
}

    public Categoria getCategoria() {
        return categoria;
    }

    public Fornecedor getFornecedor() {
        return fornecedor;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public void setFornecedor(Fornecedor fornecedor) {
        this.fornecedor = fornecedor;
    }


     
    
}
