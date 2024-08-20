<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verificar se os campos existem em $_POST
    if (!isset($_POST['nome']) || !isset($_POST['email']) || !isset($_POST['senha'])) {
        die("Dados obrigatórios não foram enviados.");
    }

    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    // Verificar se os campos estão vazios
    if (empty($nome) || empty($email) || empty($senha)) {
        die("Todos os campos são obrigatórios.");
    }

    $conn = new mysqli('localhost', 'root', '', 'ClickSaborBD');

    if ($conn->connect_error) {
        die("Conexão falhou: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("INSERT INTO CadastroCliente (Nome, Email) VALUES (?, ?)");
    $stmt->bind_param("ss", $nome, $email);

    if ($stmt->execute()) {
        $cliente_id = $stmt->insert_id;
        $hash_senha = password_hash($senha, PASSWORD_DEFAULT);
    
        $stmt = $conn->prepare("INSERT INTO LoginCliente (fk_ClienteID, Senha) VALUES (?, ?)");
        $stmt->bind_param("is", $cliente_id, $hash_senha);
    
        if ($stmt->execute()) {
            // Redirecionar para a página de login após o cadastro
            header("Location: login.html"); // Redireciona para a página de login
            exit; // Certifique-se de sair após o redirecionamento
        } else {
            echo "Erro ao salvar os dados de login: " . $stmt->error;
        }
    } else {
        echo "Erro ao salvar os dados do cliente: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>




