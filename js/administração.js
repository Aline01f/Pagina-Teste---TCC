// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    
    function loadContent(page) {
        fetch(page)
            .then(response => response.text())
            .then(html => {
                content.innerHTML = html;
            })
            .catch(error => console.error('Erro ao carregar o conteúdo:', error));
    }

    document.getElementById('estoque-link').addEventListener('click', (event) => {
        event.preventDefault();
        loadContent('estoque.html');
    });

    document.getElementById('pedidos-link').addEventListener('click', (event) => {
        event.preventDefault();
        loadContent('gerenciar_pedidos.html');
    });

    // Carrega a página inicial (pode ser estoque ou pedidos por padrão)
    loadContent('gerenciar_pedidos.html');
});
