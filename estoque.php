<?php
header('Content-Type: application/json');
$mysqli = new mysqli('localhost', 'root', '', 'ClickSaborBD');

if ($mysqli->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Erro na conexão com o banco de dados.']);
    exit();
}

$action = $_POST['action'] ?? $_GET['action'] ?? '';

switch ($action) {
    case 'add':
        $id = $_POST['id'];
        $nome = $_POST['nome'];
        $categoria = $_POST['categoria'];
        $preco = $_POST['preco'];
        $quantidade = $_POST['quantidade'];
        $imagem = $_FILES['imagem']['name'] ?? null;

        if ($imagem) {
            $imagemPath = './uploads/' . basename($imagem); // Corrigir o caminho
            if (!move_uploaded_file($_FILES['imagem']['tmp_name'], $imagemPath)) {
                echo json_encode(['status' => 'error', 'message' => 'Erro ao mover o arquivo da imagem.']);
                exit();
            }
        } else {
            $imagemPath = null;
        }

        $stmt = $mysqli->prepare('INSERT INTO produtos (id, nome, fk_CategoriaID, preco, quantidade, imagem) VALUES (?, ?, ?, ?, ?, ?)');
        $stmt->bind_param('ssiids', $id, $nome, $categoria, $preco, $quantidade, $imagemPath);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Produto adicionado com sucesso.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Erro ao adicionar produto.']);
        }
        $stmt->close();
        break;

    case 'remove':
        $id = $_POST['id'];
        $stmt = $mysqli->prepare('DELETE FROM produtos WHERE id = ?');
        $stmt->bind_param('s', $id);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Produto removido com sucesso.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Erro ao remover produto.']);
        }
        $stmt->close();
        break;

    case 'update':
        $id = $_POST['id'];
        $quantidade = $_POST['quantidade'];
        $stmt = $mysqli->prepare('UPDATE produtos SET quantidade = ? WHERE id = ?');
        $stmt->bind_param('is', $quantidade, $id);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Quantidade atualizada com sucesso.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Erro ao atualizar quantidade.']);
        }
        $stmt->close();
        break;

    case 'updateImage':
        $id = $_POST['id'];
        $imagem = $_FILES['imagem']['name'] ?? null;

        if ($imagem) {
            $imagemPath = './uploads/' . basename($imagem); // Corrigir o caminho
            if (!move_uploaded_file($_FILES['imagem']['tmp_name'], $imagemPath)) {
                echo json_encode(['status' => 'error', 'message' => 'Erro ao mover o arquivo da imagem.']);
                exit();
            }

            $stmt = $mysqli->prepare('UPDATE produtos SET imagem = ? WHERE id = ?');
            $stmt->bind_param('ss', $imagemPath, $id);

            if ($stmt->execute()) {
                echo json_encode(['status' => 'success', 'message' => 'Imagem atualizada com sucesso.']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Erro ao atualizar imagem.']);
            }
            $stmt->close();
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Nenhuma imagem enviada.']);
        }
        break;

    case 'updatePrice':
        $id = $_POST['id'];
        $preco = $_POST['preco'];
        $stmt = $mysqli->prepare('UPDATE produtos SET preco = ? WHERE id = ?');
        $stmt->bind_param('ds', $preco, $id);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Preço atualizado com sucesso.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Erro ao atualizar preço.']);
        }
        $stmt->close();
        break;

    case 'categories':
        $result = $mysqli->query('SELECT CategoriaID, Nome FROM categorias');
        $categories = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($categories);
        break;

    default:
        $result = $mysqli->query('SELECT p.id, p.nome, c.Nome AS categoria_nome, p.preco, p.quantidade, p.imagem FROM produtos p JOIN categorias c ON p.fk_CategoriaID = c.CategoriaID');
        $produtos = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($produtos);
        break;
}

$mysqli->close();
?>




















