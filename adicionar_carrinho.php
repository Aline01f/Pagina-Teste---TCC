<?php
include 'verificar_login.php';
header('Content-Type: application/json');

$response = array('success' => false, 'message' => '');

if (!isset($_SESSION['cliente_id'])) {
    $response['message'] = 'Faça login para fazer seu pedido';
    echo json_encode($response);
    exit;
}

// Conectar ao banco de dados
$mysqli = new mysqli("localhost", "root", "", "ClickSaborBD");

if ($mysqli->connect_error) {
    $response['message'] = 'Erro de conexão com o banco de dados';
    echo json_encode($response);
    exit;
}

// Obter dados do POST
$produto_id = $_POST['produto_id'];
$quantidade = $_POST['quantidade'];
$cliente_id = $_SESSION['cliente_id'];  // Corrigido para 'cliente_id'

// Verificar se o produto existe e a quantidade é suficiente
$stmt = $mysqli->prepare("SELECT quantidade FROM produtos WHERE id = ?");
$stmt->bind_param("s", $produto_id);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($quantidade_estoque);
$stmt->fetch();
if ($quantidade_estoque < $quantidade) {
    $response['message'] = 'Quantidade solicitada não disponível em estoque';
    echo json_encode($response);
    $stmt->close();
    $mysqli->close();
    exit;
}
$stmt->close();

// Preparar e executar a consulta para adicionar ao carrinho
$stmt = $mysqli->prepare("INSERT INTO carrinho (fk_ClienteID, fk_ProdutoID, Quantidade) VALUES (?, ?, ?)");
$stmt->bind_param("isi", $cliente_id, $produto_id, $quantidade);

if ($stmt->execute()) {
    // Atualizar quantidade do produto no estoque
    $stmt = $mysqli->prepare("UPDATE produtos SET quantidade = quantidade - ? WHERE id = ?");
    $stmt->bind_param("is", $quantidade, $produto_id);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = 'Produto adicionado ao carrinho com sucesso';
    } else {
        $response['message'] = 'Erro ao atualizar o estoque';
    }
} else {
    $response['message'] = 'Erro ao adicionar produto ao carrinho';
}

// Fechar a conexão
$stmt->close();
$mysqli->close();

// Retornar a resposta
echo json_encode($response);
?>


