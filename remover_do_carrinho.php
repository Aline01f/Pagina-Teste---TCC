<?php
include 'verificar_login.php';
header('Content-Type: application/json');

if (!isset($_SESSION['cliente_id'])) {
    echo json_encode(['success' => false, 'message' => 'Usuário não logado.']);
    exit;
}

if (!isset($_POST['carrinho_id'])) {
    echo json_encode(['success' => false, 'message' => 'ID do carrinho não fornecido.']);
    exit;
}

$carrinho_id = $_POST['carrinho_id'];
$cliente_id = $_SESSION['cliente_id'];
$dsn = 'mysql:host=localhost;dbname=ClickSaborBD;charset=utf8mb4';
$username = 'seu_usuario';
$password = 'sua_senha';

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare('DELETE FROM carrinho WHERE CarrinhoID = :carrinho_id AND fk_ClienteID = :cliente_id');
    $stmt->execute([
        'carrinho_id' => $carrinho_id,
        'cliente_id' => $cliente_id
    ]);

    $response = ['success' => true];
} catch (PDOException $e) {
    $response = ['success' => false, 'message' => 'Erro ao conectar ao banco de dados.'];
}

echo json_encode($response);
?>
