<?php
// Conexão com o banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ClickSaborBD";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Verificar se há uma solicitação para atualizar o status do pedido
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['pedido_id']) && isset($_POST['status'])) {
    $pedido_id = $_POST['pedido_id'];
    $status = $_POST['status'];

    // Atualizar o status do pedido
    $sql = "UPDATE pedidos SET StatusPedido = ? WHERE PedidoID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $status, $pedido_id);
    if ($stmt->execute()) {
        echo "Status atualizado com sucesso.";
    } else {
        echo "Erro ao atualizar o status: " . $conn->error;
    }
    $stmt->close();
    exit;
}

// Buscar todos os pedidos
$sql = "SELECT pedidos.PedidoID, CadastroCliente.Nome, pedidos.StatusPedido, pedidos.DataPedido 
        FROM pedidos 
        JOIN CadastroCliente ON pedidos.fk_ClienteID = CadastroCliente.ClienteID 
        ORDER BY pedidos.DataPedido DESC";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $pedidos = [];

    // Obter os dados de cada pedido
    while ($row = $result->fetch_assoc()) {
        $pedido_id = $row['PedidoID'];

        // Buscar itens do pedido
        $sql_itens = "SELECT produtos.nome, pedido_itens.Quantidade 
                      FROM pedido_itens 
                      JOIN produtos ON pedido_itens.fk_ProdutoID = produtos.id 
                      WHERE pedido_itens.fk_PedidoID = $pedido_id";

        $result_itens = $conn->query($sql_itens);

        $itens = [];
        if ($result_itens->num_rows > 0) {
            while ($item = $result_itens->fetch_assoc()) {
                $itens[] = $item['Quantidade'] . 'x ' . $item['nome'];
            }
        }

        $pedidos[] = [
            'PedidoID' => $row['PedidoID'],
            'Nome' => $row['Nome'],
            'StatusPedido' => $row['StatusPedido'],
            'Itens' => implode(', ', $itens)
        ];
    }

    // Exibir os pedidos em formato JSON
    echo json_encode($pedidos);
} else {
    echo json_encode([]);
}

$conn->close();
?>
