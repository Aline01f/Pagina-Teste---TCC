document.addEventListener("DOMContentLoaded", function() {
    if (!verificarUsuarioLogado()) {
        // Exibe uma mensagem ou redireciona para a página de login
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "login.html";
    }
});

function verificarUsuarioLogado() {
    // Verifica se o cookie da sessão PHP está presente
    return Boolean(document.cookie.match(/^(.*;)?\s*PHPSESSID\s*=\s*[^;]+(.*)?$/));
}// Função para obter a lista de produtos do servidor
async function fetchProducts() {
    try {
        const response = await fetch('/api/produtos');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao obter produtos:', error);
    }
}

// Função para renderizar produtos na página inicial
async function renderProducts() {
    const products = await fetchProducts();
    const salgadosContainer = document.getElementById('salgadosItems');
    const refrigerantesContainer = document.getElementById('refrigerantesItems');
    const docesContainer = document.getElementById('docesItems');

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'menu-item';
        productElement.innerHTML = `
            <img src="${product.imagem || 'https://via.placeholder.com/250'}" alt="${product.nome}" width="250px" height="200px">
            <h3>${product.nome}</h3>
            <span class="price">R$${product.preco.toFixed(2)}</span>
            <button class="add-to-cart" data-price="${product.preco}">Adicionar ao Carrinho</button>
        `;

        if (product.categoria === 'salgados') {
            salgadosContainer.appendChild(productElement);
        } else if (product.categoria === 'bebidas') {
            refrigerantesContainer.appendChild(productElement);
        } else if (product.categoria === 'doces') {
            docesContainer.appendChild(productElement);
        }
    });
}

// Renderiza os produtos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});

