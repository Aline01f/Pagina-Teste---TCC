<?php
include 'verificar_login.php'; // Este arquivo deve garantir que o cliente está autenticado
header('Content-Type: application/json');

// Conexão com o banco de dados
$mysqli = new mysqli('localhost', 'root', '', 'ClickSaborBD');

if ($mysqli->connect_error) {
    echo json_encode(['error' => 'Erro na conexão com o banco de dados.']);
    exit();
}

// A variável cliente_id é definida no contexto da sessão
if (isset($_SESSION['cliente_id'])) {
    $clienteID = $_SESSION['cliente_id'];
} else {
    echo json_encode(['error' => 'Cliente não autenticado.']);
    exit();
}

// Recupera o último pedido do cliente
$query = "
    SELECT p.PedidoID, p.DataPedido, p.StatusPedido, p.ValorTotal, p.MetodoPagamento, p.EnderecoEntrega
    FROM pedidos p
    WHERE p.fk_ClienteID = ?
    ORDER BY p.DataPedido DESC
    LIMIT 1
";
$stmt = $mysqli->prepare($query);
$stmt->bind_param('i', $clienteID);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $pedido = $result->fetch_assoc();

    // Recupera os itens do pedido
    $pedidoID = $pedido['PedidoID'];
    $queryItens = "
        SELECT pi.fk_ProdutoID, p.nome AS produtoNome, pi.Quantidade, pi.PrecoUnitario
        FROM pedido_itens pi
        JOIN produtos p ON pi.fk_ProdutoID = p.id
        WHERE pi.fk_PedidoID = ?
    ";
    $stmtItens = $mysqli->prepare($queryItens);
    $stmtItens->bind_param('i', $pedidoID);
    $stmtItens->execute();
    $resultItens = $stmtItens->get_result();

    $pedido['itens'] = [];
    while ($item = $resultItens->fetch_assoc()) {
        $pedido['itens'][] = $item;
    }

    echo json_encode($pedido);
} else {
    echo json_encode(['error' => 'Nenhum pedido encontrado.']);
}

$stmt->close();
$mysqli->close();
?>

