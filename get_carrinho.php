<?php
include 'verificar_login.php';
header('Content-Type: application/json');

if (!isset($_SESSION['cliente_id'])) {
    echo json_encode(['success' => false, 'message' => 'Usuário não logado.']);
    exit;
}

$cliente_id = $_SESSION['cliente_id'];
$dsn = 'mysql:host=localhost;dbname=ClickSaborBD;charset=utf8mb4';
$username = 'root'; // Altere para seu usuário
$password = ''; // Altere para sua senha

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Ajustado para refletir o esquema da tabela 'carrinho'
    $stmt = $pdo->prepare('
        SELECT c.CarrinhoID AS carrinho_id, p.id AS produto_id, p.nome, p.preco, c.Quantidade AS quantidade
        FROM carrinho c
        JOIN produtos p ON c.fk_ProdutoID = p.id
        WHERE c.fk_ClienteID = :cliente_id
    ');
    $stmt->execute(['cliente_id' => $cliente_id]);
    $itens = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $response = [
        'success' => true,
        'items' => $itens
    ];
} catch (PDOException $e) {
    $response = [
        'success' => false,
        'message' => 'Erro ao conectar ao banco de dados: ' . $e->getMessage()
    ];
}

echo json_encode($response);
?>


