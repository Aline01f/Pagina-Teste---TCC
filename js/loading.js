document.addEventListener("DOMContentLoaded", function() {
    // Exibe o conteúdo da página após o carregamento completo
    function showContent() {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    }

    // Redireciona para home.html depois do tempo determinado
    function redirectToHome() {
        window.location.href = 'home.html';
    }

    // Tempo em milissegundos para exibir a tela de carregamento
    const loadingTime = 1000; // 3 segundos

    // Configura o tempo de exibição da tela de carregamento e redireciona
    setTimeout(() => {
        showContent();
        redirectToHome();
    }, loadingTime);
});
