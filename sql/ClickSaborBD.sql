-- Banco de dados ClickSabor
CREATE DATABASE ClickSaborBD
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

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
  
  select * from CadastroCliente;
  select * from LoginCliente;
  
-- -----------------------------------------------------------------------------------------------------------------------------------