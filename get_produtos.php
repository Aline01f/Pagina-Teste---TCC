<?php
header('Content-Type: application/json');

// Configurações do banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ClickSaborBD";

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    echo json_encode(["error" => "Conexão falhou: " . $conn->connect_error]);
    exit();
}

// Consultar produtos
$sql = "SELECT p.id, p.nome, p.preco, CONCAT(p.imagem) as imagem, p.quantidade, c.Nome as categoria
        FROM produtos p
        JOIN categorias c ON p.fk_CategoriaID = c.CategoriaID";
$result = $conn->query($sql);

$produtos = [];
if ($result->num_rows > 0) {
    // Armazenar dados em um array
    while($row = $result->fetch_assoc()) {
        $produtos[] = $row;
    }
} else {
    // Nenhum produto encontrado
    $produtos = ["message" => "Nenhum produto encontrado"];
}

// Fechar conexão
$conn->close();

// Retornar dados em formato JSON
echo json_encode($produtos);
?>







