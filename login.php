<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_POST['email']) || !isset($_POST['senha'])) {
        die("Email e senha são obrigatórios.");
    }

    $email = $_POST['email'];
    $senha = $_POST['senha'];

    if (empty($email) || empty($senha)) {
        die("Email e senha são obrigatórios.");
    }

    $conn = new mysqli('localhost', 'root', '', 'ClickSaborBD');

    if ($conn->connect_error) {
        die("Conexão falhou: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("SELECT Senha FROM LoginCliente JOIN CadastroCliente ON LoginCliente.fk_ClienteID = CadastroCliente.ClienteID WHERE CadastroCliente.Email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows === 0) {
        die("Email ou senha inválidos.");
    }

    $stmt->bind_result($hash_senha);
    $stmt->fetch();

    if (password_verify($senha, $hash_senha)) {
        echo "Login realizado com sucesso!";
    } else {
        echo "Email ou senha inválidos.";
    }

    $stmt->close();
    $conn->close();
}
?>



