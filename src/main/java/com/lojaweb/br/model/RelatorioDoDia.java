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
@Table(name = "relatorioDoDia")
public class RelatorioDoDia {
    
     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idRelatorio;
       private Double totalVendasDoDia;
       
       @ManyToOne
       @JoinColumn(name = "id_funcionario")
      private Funcionario funcionario;
      
    

    public RelatorioDoDia(Integer idRelatorio,Double  totalVendasDoDia, Funcionario funcionario) {
        this.idRelatorio = idRelatorio;
        this.totalVendasDoDia=totalVendasDoDia;
        this.funcionario = funcionario;
    }
    
    public RelatorioDoDia(){
        
    }

   public Integer getIdRelatorio() {
    return idRelatorio;
}

public void setIdRelatorio(Integer idRelatorio) {
    this.idRelatorio = idRelatorio;
}

    public Funcionario getFuncionario() {
        return funcionario;
    }

    
    public void setFuncionario(Funcionario funcionario) {
        this.funcionario = funcionario;
    }

    public Double getTotalVendasDoDia() {
        return totalVendasDoDia;
    }

    public void setTotalVendasDoDia(Double totalVendasDoDia) {
        this.totalVendasDoDia = totalVendasDoDia;
    }

  
}
