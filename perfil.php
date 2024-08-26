<?php
include 'verificar_login.php';
header('Content-Type: application/json');

if (!isset($_SESSION['cliente_id'])) {
    echo json_encode(['success' => false, 'message' => 'Usuário não logado.']);
    exit;
}

$clienteID = $_SESSION['cliente_id'];

$conn = new mysqli('localhost', 'root', '', 'ClickSaborBD');

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Erro na conexão com o banco de dados: ' . $conn->connect_error]);
    exit;
}

$sql = "SELECT Nome, Email FROM CadastroCliente WHERE ClienteID = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Erro na preparação da consulta: ' . $conn->error]);
    exit;
}

$stmt->bind_param("i", $clienteID);
$stmt->execute();
$result = $stmt->get_result();
$cliente = $result->fetch_assoc();

if (!$cliente) {
    echo json_encode(['success' => false, 'message' => 'Cliente não encontrado']);
    exit;
}

echo json_encode($cliente);

$stmt->close();
$conn->close();
?>

