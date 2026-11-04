🛒 Loja Web

Sistema web de gerenciamento de uma loja, desenvolvido com Java e Spring Boot, com integração ao banco de dados MySQL. O projeto tem como objetivo facilitar o gerenciamento de produtos, categorias, fornecedores, clientes, funcionários e vendas.

🚀 Tecnologias utilizadas

Java 17 – Linguagem de programação.

Spring Boot 4.1.1 – Framework para desenvolvimento da aplicação.

Spring Data JPA – Persistência e gerenciamento de dados.

Hibernate – Mapeamento objeto-relacional (ORM).

MySQL 8 – Banco de dados relacional.

Thymeleaf – Integração de páginas HTML com o Spring Boot.

HTML5 – Estrutura das páginas.

CSS3 – Estilização e responsividade.

JavaScript – Interatividade.

Maven – Gerenciamento de dependências.

Postman – Testes de endpoints da API.

📋 Funcionalidades

O sistema possui módulos para gerenciamento das principais operações de uma loja:

Cadastro e gerenciamento de categorias.

Cadastro e gerenciamento de produtos.

Gerenciamento de fornecedores.

Gerenciamento de clientes.

Gerenciamento de funcionários.

Registro e gerenciamento de vendas.

Relatórios para acompanhamento das operações.

Navegação entre os módulos por meio de um menu principal.

Integração com banco de dados MySQL.

🌐 Endpoints REST

O projeto também disponibiliza endpoints REST para operações relacionadas a categorias e produtos:

Método

Endpoint

GET

/categorias

GET

/produtos

🖥️ Páginas do sistema

/ – Página inicial.

/menu – Menu principal.

/categoria – Gerenciamento de categorias.

/produto – Gerenciamento de produtos.

/fornecedor – Gerenciamento de fornecedores.

/cliente – Gerenciamento de clientes.

/funcionario – Gerenciamento de funcionários.

/venda – Gerenciamento de vendas.

/relatorio – Relatórios.

⚙️ Como executar o projeto

1. Pré-requisitos

Antes de executar o projeto, você precisará ter instalado:

JDK 17 ou superior.

MySQL 8.

Apache Maven.

IDE de sua preferência (NetBeans, IntelliJ IDEA ou Eclipse).

2. Clone o repositório

git clone URL_DO_SEU_REPOSITORIO

3. Configure o banco de dados

Crie um banco de dados no MySQL:

CREATE DATABASE lojaWeb;

Configure as credenciais de acesso ao banco no arquivo application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/lojaWeb
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

4. Execute a aplicação

Abra o projeto na sua IDE e execute a classe principal BrApplication.

A aplicação estará disponível em:

http://localhost:8080

📚 Objetivo do projeto

Este projeto foi desenvolvido como parte da prática de desenvolvimento de sistemas, com o objetivo de aplicar conhecimentos em Java, Spring Boot, banco de dados relacionais, desenvolvimento web, arquitetura MVC e integração com APIs REST.

Também contribuiu para o aprimoramento de habilidades em organização de código, persistência de dados e desenvolvimento de aplicações utilizando tecnologias do ecossistema Java.

Desenvolvido por Giovana Correia 💻
