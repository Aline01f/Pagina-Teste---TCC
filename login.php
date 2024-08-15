<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_POST['email']) || !isset($_POST['senha'])) {
        echo json_encode(["success" => false, "message" => "Email e senha são obrigatórios."]);
        exit;
    }

    $email = $_POST['email'];
    $senha = $_POST['senha'];

    if (empty($email) || empty($senha)) {
        echo json_encode(["success" => false, "message" => "Email e senha são obrigatórios."]);
        exit;
    }

    $conn = new mysqli('localhost', 'root', '', 'ClickSaborBD');

    if ($conn->connect_error) {
        echo json_encode(["success" => false, "message" => "Conexão falhou: " . $conn->connect_error]);
        exit;
    }

    $stmt = $conn->prepare("SELECT Senha, ClienteID FROM LoginCliente JOIN CadastroCliente ON LoginCliente.fk_ClienteID = CadastroCliente.ClienteID WHERE CadastroCliente.Email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows === 0) {
        echo json_encode(["success" => false, "message" => "Email ou senha inválidos."]);
        exit;
    }

    $stmt->bind_result($hash_senha, $cliente_id);
    $stmt->fetch();

    if (password_verify($senha, $hash_senha)) {
        $_SESSION['cliente_id'] = $cliente_id;
        echo json_encode(["success" => true, "message" => "Login realizado com sucesso!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Email ou senha inválidos."]);
    }

    $stmt->close();
    $conn->close();
}
?>









