<?php
$host = 'localhost';
$db = 'ClickSaborBD';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Erro na conexão com o banco de dados: ' . $e->getMessage()]);
    exit;
}

header('Content-Type: application/json');

// Função para adicionar um produto
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    $action = $_POST['action'];

    try {
        if ($action === 'add') {
            $id = $_POST['id'];
            $nome = $_POST['nome'];
            $quantidade = $_POST['quantidade'];
            $imagem = '';

            if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] == UPLOAD_ERR_OK) {
                $fileTmpPath = $_FILES['imagem']['tmp_name'];
                $fileName = $_FILES['imagem']['name'];
                $fileNameCmps = explode(".", $fileName);
                $fileExtension = strtolower(end($fileNameCmps));
                
                $newFileName = md5(time() . $fileName) . '.' . $fileExtension;
                $uploadFileDir = './uploads/';
                $dest_path = $uploadFileDir . $newFileName;

                if (move_uploaded_file($fileTmpPath, $dest_path)) {
                    $imagem = $newFileName;
                } else {
                    throw new Exception('Falha ao mover o arquivo para o diretório de upload.');
                }
            }

            $stmt = $pdo->prepare('INSERT INTO produtos (id, nome, quantidade, imagem, categoria) VALUES (?, ?, ?, ?, "salgados")');
            $stmt->execute([$id, $nome, $quantidade, $imagem]);
            echo json_encode(['status' => 'success']);
        } 

        // Outras ações
        elseif ($action === 'remove') {
            $id = $_POST['id'];
            $stmt = $pdo->prepare('DELETE FROM produtos WHERE id = ?');
            $stmt->execute([$id]);
            echo json_encode(['status' => 'success']);
        }

        elseif ($action === 'update') {
            $id = $_POST['id'];
            $quantidade = $_POST['quantidade'];
            $stmt = $pdo->prepare('UPDATE produtos SET quantidade = ? WHERE id = ?');
            $stmt->execute([$quantidade, $id]);
            echo json_encode(['status' => 'success']);
        }

        elseif ($action === 'updateImage') {
            $id = $_POST['id'];
            $imagem = '';

            if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] == UPLOAD_ERR_OK) {
                $fileTmpPath = $_FILES['imagem']['tmp_name'];
                $fileName = $_FILES['imagem']['name'];
                $fileNameCmps = explode(".", $fileName);
                $fileExtension = strtolower(end($fileNameCmps));
                
                $newFileName = md5(time() . $fileName) . '.' . $fileExtension;
                $uploadFileDir = './uploads/';
                $dest_path = $uploadFileDir . $newFileName;

                if (move_uploaded_file($fileTmpPath, $dest_path)) {
                    $imagem = $newFileName;
                } else {
                    throw new Exception('Falha ao mover o arquivo para o diretório de upload.');
                }
            }

            $stmt = $pdo->prepare('UPDATE produtos SET imagem = ? WHERE id = ?');
            $stmt->execute([$imagem, $id]);
            echo json_encode(['status' => 'success']);
        }
        
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}

// Função para listar produtos
elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->query('SELECT * FROM produtos');
        $produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($produtos);
    } catch (Exception $e) {
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }
}
?>




