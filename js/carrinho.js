document.addEventListener("DOMContentLoaded", function() {
    if (!verificarUsuarioLogado()) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "login.html";
    } else {
        carregarCarrinho();  // Carregar o carrinho se o usuário estiver logado
    }
});

function verificarUsuarioLogado() {
    return Boolean(document.cookie.match(/^(.*;)?\s*PHPSESSID\s*=\s*[^;]+(.*)?$/));
}

function carregarCarrinho() {
    fetch('get_carrinho.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const cartItems = document.getElementById('cart-items');
                const cartSummary = document.getElementById('cart-summary');

                cartItems.innerHTML = '';
                cartSummary.innerHTML = '';

                let total = 0;

                data.items.forEach(item => {
                    const row = document.createElement('tr');

                    const nomeProduto = `<td>${item.nome}</td>`;
                    const precoProduto = `<td>R$ ${parseFloat(item.preco).toFixed(2)}</td>`;
                    const quantidadeProduto = `<td>${item.quantidade}</td>`;
                    const totalItem = `<td>R$ ${(item.preco * item.quantidade).toFixed(2)}</td>`;

                    // Ajustado para usar `CarrinhoID` como data-id
                    const botaoRemover = `<td><button class="remove" data-id="${item.carrinho_id}">×</button></td>`;

                    row.innerHTML = nomeProduto + precoProduto + quantidadeProduto + totalItem + botaoRemover;
                    cartItems.appendChild(row);

                    total += item.preco * item.quantidade;
                });

                cartSummary.innerHTML = `
                    <div><strong>Total:</strong> R$ ${total.toFixed(2)}</div>
                `;

                document.querySelectorAll('.remove').forEach(button => {
                    button.addEventListener('click', function () {
                        removerDoCarrinho(this.getAttribute('data-id'));
                    });
                });
            } else {
                alert('Erro ao carregar o carrinho: ' + data.message);
            }
        })
        .catch(error => console.error('Erro ao carregar o carrinho:', error));
}

function removerDoCarrinho(carrinho_id) {
    fetch('remover_produto.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `carrinho_id=${carrinho_id}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            carregarCarrinho();  // Recarregar o carrinho após a remoção
        } else {
            alert('Erro ao remover item do carrinho: ' + data.message);
        }
    })
    .catch(error => console.error('Erro ao remover item do carrinho:', error));
}


