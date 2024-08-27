<?php
include 'verificar_login.php';
header('Content-Type: application/json');

if (!isset($_SESSION['cliente_id'])) {
    echo json_encode(['success' => false, 'message' => 'Usuário não logado.']);
    exit;
}

$clienteID = $_SESSION['cliente_id'];

$conn = new mysqli('localhost', 'root', '', 'ClickSaborBD');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Puxar os dados do cliente
    $sql = "SELECT Nome, Email FROM CadastroCliente WHERE ClienteID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $clienteID);
    $stmt->execute();
    $result = $stmt->get_result();
    $cliente = $result->fetch_assoc();

    echo json_encode($cliente);

} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['delete'])) {
        // Excluir a conta
        $sql = "DELETE FROM LoginCliente WHERE fk_ClienteID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $clienteID);
        $stmt->execute();

        $sql = "DELETE FROM CadastroCliente WHERE ClienteID = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $clienteID);
        $stmt->execute();

        session_destroy();
        echo json_encode(['success' => true, 'message' => "Conta excluída com sucesso!"]);
        exit;
    }

    // Atualizar os dados do cliente
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);

    $sql = "UPDATE CadastroCliente SET Nome = ?, Email = ? WHERE ClienteID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssi", $nome, $email, $clienteID);
    $stmt->execute();

    $sql = "UPDATE LoginCliente SET Senha = ? WHERE fk_ClienteID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $senha, $clienteID);
    $stmt->execute();

    echo json_encode(['success' => true, 'message' => "Dados atualizados com sucesso!"]);

}

$conn->close();
?>


