<?php
require_once 'verificar_login.php';

// Captura o ID do cliente logado
$cliente_id = $_SESSION['cliente_id'];

// Conecta ao banco de dados
$mysqli = new mysqli('localhost', 'root', '', 'ClickSaborBD');

// Verifica a conexão
if ($mysqli->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Erro de conexão: ' . $mysqli->connect_error]);
    exit;
}

// Habilita a exibição de erros (apenas para desenvolvimento, desativar em produção)
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    // Inicia a transação
    $mysqli->begin_transaction();

    // Busca os itens do carrinho do cliente
    $result = $mysqli->query("SELECT c.fk_ProdutoID, p.preco, c.Quantidade 
                              FROM carrinho c 
                              JOIN produtos p ON c.fk_ProdutoID = p.id 
                              WHERE c.fk_ClienteID = $cliente_id");

    if ($result->num_rows === 0) {
        echo json_encode(['success' => false, 'message' => 'Carrinho vazio.']);
        exit;
    }

    // Calcula o valor total do pedido
    $valor_total = 0;
    while ($item = $result->fetch_assoc()) {
        $valor_total += $item['preco'] * $item['Quantidade'];
    }

    // Cria um novo pedido
    $stmt = $mysqli->prepare("INSERT INTO pedidos (fk_ClienteID, DataPedido, StatusPedido, ValorTotal, MetodoPagamento, EnderecoEntrega) 
                              VALUES (?, NOW(), 'Pendente', ?, 'Cartão de Crédito', 'Endereço Exemplo')");
    $stmt->bind_param('id', $cliente_id, $valor_total);
    $stmt->execute();

    // Obtém o ID do pedido recém-criado
    $pedido_id = $stmt->insert_id;

    // Insere os itens do pedido
    $stmt_item = $mysqli->prepare("INSERT INTO pedido_itens (fk_PedidoID, fk_ProdutoID, Quantidade, PrecoUnitario) 
                                   VALUES (?, ?, ?, ?)");
    
    // Reseta o ponteiro do resultado para inserir os itens do pedido
    $result->data_seek(0);
    while ($item = $result->fetch_assoc()) {
        $stmt_item->bind_param('isid', $pedido_id, $item['fk_ProdutoID'], $item['Quantidade'], $item['preco']);
        $stmt_item->execute();
    }

    // Limpa o carrinho do cliente
    $mysqli->query("DELETE FROM carrinho WHERE fk_ClienteID = $cliente_id");

    // Confirma a transação
    $mysqli->commit();

    echo json_encode(['success' => true]);

} catch (Exception $e) {
    // Reverte a transação em caso de erro
    $mysqli->rollback();
    echo json_encode(['success' => false, 'message' => 'Erro ao finalizar o pedido: ' . $e->getMessage()]);
}

// Fecha a conexão
$mysqli->close();
?>

