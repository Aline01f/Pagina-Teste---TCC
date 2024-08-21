
-- Criar o banco de dados ClickSabor
CREATE DATABASE ClickSaborBD
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- Usar o banco de dados ClickSabor
USE ClickSaborBD;

-- Tabelas que recebem os dados dos usuários para cadastro e login
CREATE TABLE CadastroCliente (
    ClienteID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL,
    Email VARCHAR(100) NOT NULL,
    UNIQUE (Email) -- Garante que o email seja único
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

CREATE TABLE LoginCliente (
    LoginID INT AUTO_INCREMENT PRIMARY KEY,
    fk_ClienteID INT NOT NULL,
    Senha VARCHAR(255) NOT NULL,
    FOREIGN KEY (fk_ClienteID) REFERENCES CadastroCliente (ClienteID) -- Estabelece a relação entre logins e clientes
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------

-- Tabela para armazenar as categorias
CREATE TABLE categorias (
    CategoriaID INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- Tabela para controle de estoque
CREATE TABLE produtos (
    id VARCHAR(50) PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    fk_CategoriaID INT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    quantidade INT NOT NULL,
    imagem TEXT,
    FOREIGN KEY (fk_CategoriaID) REFERENCES categorias (CategoriaID) -- Estabelece a relação com categorias
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------

-- Inserir categorias padrão
INSERT INTO categorias (Nome) VALUES ('Salgados'), ('Bebidas'), ('Doces');

-- ----------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------

-- Tabela para armazenar itens no carrinho
CREATE TABLE carrinho (
    CarrinhoID INT AUTO_INCREMENT PRIMARY KEY,
    fk_ClienteID INT NOT NULL,
    fk_ProdutoID VARCHAR(50) NOT NULL,
    Quantidade INT NOT NULL,
    FOREIGN KEY (fk_ClienteID) REFERENCES CadastroCliente (ClienteID),
    FOREIGN KEY (fk_ProdutoID) REFERENCES produtos (id)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;
  
-- ----------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------
-- Controle dos pedidos
-- Tabela para armazenar os pedidos
CREATE TABLE pedidos (
    PedidoID INT AUTO_INCREMENT PRIMARY KEY,
    fk_ClienteID INT NOT NULL,
    DataPedido DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    StatusPedido VARCHAR(50) NOT NULL DEFAULT 'Pendente',
    ValorTotal DECIMAL(10, 2) NOT NULL,
    MetodoPagamento VARCHAR(100) NOT NULL,
    EnderecoEntrega TEXT NOT NULL,
    FOREIGN KEY (fk_ClienteID) REFERENCES CadastroCliente(ClienteID)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- Tabela para armazenar os itens de cada pedido
CREATE TABLE pedido_itens (
    PedidoItemID INT AUTO_INCREMENT PRIMARY KEY,
    fk_PedidoID INT NOT NULL,
    fk_ProdutoID VARCHAR(50) NOT NULL,
    Quantidade INT NOT NULL,
    PrecoUnitario DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (fk_PedidoID) REFERENCES pedidos(PedidoID),
    FOREIGN KEY (fk_ProdutoID) REFERENCES produtos(id)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------------------------------------------------------------
-- ----------------------------------------------------------------------------------------------------------------------------------

-- AValiar Tabelas
SELECT * FROM CadastroCliente;
SELECT * FROM LoginCliente;
SELECT * FROM categorias;
SELECT * FROM produtos;
SELECT * FROM pedido_itens;