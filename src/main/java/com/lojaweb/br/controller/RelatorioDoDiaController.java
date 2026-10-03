/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.lojaweb.br.controller;

import com.lojaweb.br.model.Funcionario;
import com.lojaweb.br.model.RelatorioDoDia;
import com.lojaweb.br.repository.FuncionarioRepository;
import com.lojaweb.br.repository.RelatorioDoDiaRepository;
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
@RequestMapping("/relatorios")
@CrossOrigin(origins = "*")
public class RelatorioDoDiaController {
   @Autowired
    private RelatorioDoDiaRepository relatorioRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    
    @GetMapping
    public List<RelatorioDoDia> listarRelatorios() {
        return relatorioRepository.findAll();
    }

   
    @GetMapping("/{id}")
    public ResponseEntity<RelatorioDoDia> buscarRelatorio(
            @PathVariable int id) {

        return relatorioRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    
    @PostMapping
    public RelatorioDoDia cadastrarRelatorio(
            @RequestBody RelatorioDoDia relatorio) {

        if (relatorio.getFuncionario() != null
                && relatorio.getFuncionario().getIdFuncionario() != null) {

            Funcionario funcionario = funcionarioRepository
                    .findById(
                            relatorio.getFuncionario()
                                    .getIdFuncionario()
                    )
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Funcionário não encontrado"));

            relatorio.setFuncionario(funcionario);
        }

        return relatorioRepository.save(relatorio);
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<RelatorioDoDia> atualizarRelatorio(
            @PathVariable int id,
            @RequestBody RelatorioDoDia relatorio) {

        return relatorioRepository.findById(id)
                .map(relatorioExistente -> {

                    relatorioExistente.setTotalVendasDoDia(
                            relatorio.getTotalVendasDoDia()
                    );

                    if (relatorio.getFuncionario() != null
                            && relatorio.getFuncionario()
                                    .getIdFuncionario() != null) {

                        Funcionario funcionario = funcionarioRepository
                                .findById(
                                        relatorio.getFuncionario()
                                                .getIdFuncionario()
                                )
                                .orElseThrow(() ->
                                        new RuntimeException(
                                                "Funcionário não encontrado"));

                        relatorioExistente.setFuncionario(
                                funcionario
                        );
                    }

                    RelatorioDoDia atualizado =
                            relatorioRepository.save(
                                    relatorioExistente
                            );

                    return ResponseEntity.ok(atualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }

  
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirRelatorio(
            @PathVariable int id) {

        if (!relatorioRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        relatorioRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}
