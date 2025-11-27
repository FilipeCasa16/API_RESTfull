# API_RESTfull
Trabalho de DW2, Filipe, Laura e Bianca. 
CTRL + ALT + DEL

--------------------------------
## Inventário de Livros e Autores
--------------------------------

**Descrição do Projeto**
------------------------
Um sistema de inventário de livros e autores, o sistema permite adicionar autores
e adicionar livros por nome, autor cadastrado, ano de publicação e gênero da obra.
Sendo possivel, adicionar, aditar e excluir autores e livros se necessário.  



**Como Executar**
------------------

**Pré-Requisitos (Aplicativos Necessários)**

-MySQL Workbench 8.0

-Visual Estudio Code


**Primeiro Passo: Clonar o Repositório**
----------------------------------------
```` bash
git clone https://github.com/FilipeCasa16/API_RESTfull.git
cd API_RESTfull
````

Ou se for o caso, use apenas o link:

````bash
https://github.com/FilipeCasa16/API_RESTfull.git
````

Logo após deve de abrir o arquivo do projeto no aplicativo Visual Studio Code(VScode), abrir a pasta do projeto API_RESTfull, em seguida abrir a pasta "backend", abrir a pasta "src", e entrar no arquivo "database.js" e na linha "password" colocar a sua senha do MySQL aonde é requisitado e salvar o arquivo usando ``CTRL + S``.

``EXEMPLO:``
``password: 'sua_senha_mysql',``

**Segundo Passo: Instalar Dependências**
----------------------------------------

Após isso, você deve abrir dois terminais do seu computador, em um dele navegue até o **backend**, e no outro navegue até o **frontend**, e logo após instalar as dependências que se pede em cada um deles.

**Backend** 
````bash
cd backend

npm install
npm install axios
npm install --save-dev nodemon
npm install express cors
npm init -y
npm install mysql2
````

**Frontend**
````bash
cd frontend

npm install
npm install axios
````

**Terceiro Passo: Configurar o Backend (no aplicativo MySQL)**
--------------------------------------------------------------

**Configurar o banco MySQL**

-Crie um banco de dados chamado: inventario_de_livros 

-Para criar o banco, escreva o código: 
````bash
CREATE DATABASE inventario_livros;
````
-Para entrar no banco, escreva o código:
````bash
USE inventario_livros;
````

**Inserindo Dados**
-------------------

**Criando tabelas**

-Para criar as tabelas escreva os códigos abaixo e execute cada um separadamente

````bash
CREATE TABLE autores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL
);

CREATE TABLE livros (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  ano_publicacao INT,
  autor_id INT,
  genero VARCHAR(60) NOT NULL,
  FOREIGN KEY (autor_id) REFERENCES autores(id)
);
````


**Inserindo dados**

-Para inserir os dados iniciais nas tabelas escreva os códigos abaixo e execute cada um separadamente

````bash
INSERT INTO autores (id, nome) VALUES
(2, 'Clarice Lispector'),
(4, 'Jeff Kinney'),
(6, 'Zack Zumbi'),
(7, 'Anne Frank'),
(8, 'Charles Perrault');


INSERT INTO livros (titulo, ano_publicacao, autor_id, genero) VALUES
('Água Viva', 1963, 2, 'Romance'),
('Diário de um Banana', 2010, 4, 'Comédia');
````

**Iniciar servidor do backend**

Logo após entre novamente no terminal do **backend** e inicie seu servidor com o código:

````bash
npm run dev
````

**Quarto Passo: Configurar o Frontend**
---------------------------------------

No terminal do **frontend** e inicie seu servidor com o código:

````bash
npm run dev
````

**Acessando o Projeto**
-----------------------

Para acessar o projeto, entre em uma nova aba de seu navegador e abra esses **links**:

-Frontend: http://localhost:5173/

-Backend: http://localhost:3001 se aparecer a mensagem (API Inventário rodando 🚀), o backend esta funcionando.


**Desenvolvedores**
-------------------

Bianca Gabriela Golfe, Filipe Casadei e Laura Leandra Faccin.

