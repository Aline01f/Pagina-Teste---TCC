<?php
session_start(); // Inicia a sessão

// Verifica se o ID do cliente está definido na sessão
if (!isset($_SESSION['cliente_id'])) {
    // Se não estiver, redireciona para a página de login
    header('Location: login.html');
    exit();
}
    
?>



