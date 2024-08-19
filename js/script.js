// Função para alternar a exibição da barra de navegação
document.getElementById('toggleButton').addEventListener('click', function() {
    var navbarLinks = document.getElementById('navbarLinks');
    navbarLinks.classList.toggle('active');
});

// Função para carregar os produtos ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    fetch('get_produtos.php')
        .then(response => response.text())
        .then(text => {
            try {
                const produtos = JSON.parse(text);
                const categorias = {
                    'Salgados': document.getElementById('salgados-items'),
                    'Bebidas': document.getElementById('refrigerantes-items'),
                    'Doces': document.getElementById('doces-items')
                };

                produtos.forEach(produto => {
                    const produtoDiv = document.createElement('div');
                    produtoDiv.className = 'menu-item';

                    let botaoAdicionar = '';
                    let mensagemEstoque = '';

                    if (produto.quantidade > 0) {
                        botaoAdicionar = `<button class="add-to-cart" data-id="${produto.id}" data-price="${produto.preco}">Adicionar ao Carrinho</button>`;
                    } else {
                        mensagemEstoque = '<span class="estoque-indisponivel">Indisponível</span>';
                    }

                    const imageUrl = produto.imagem ? produto.imagem : 'https://via.placeholder.com/250x200';

                    produtoDiv.innerHTML = `
                        <img src="${imageUrl}" alt="${produto.nome}" width="250px" height="200px">
                        <h3>${produto.nome}</h3>
                        <span class="price">R$ ${parseFloat(produto.preco).toFixed(2)}</span>
                        <div class="quantidade-control">
                            <button class="diminui-quantidade">-</button>
                            <span class="produto-quantidade">1</span>
                            <button class="aumenta-quantity">+</button>
                        </div>
                        ${botaoAdicionar}
                        ${mensagemEstoque}
                    `;

                    const categoria = produto.categoria;
                    if (categorias[categoria]) {
                        categorias[categoria].appendChild(produtoDiv);
                    }

                    // Adicionar eventos para os botões de aumentar e diminuir
                    const decreaseButton = produtoDiv.querySelector('.decrease-quantity');
                    const increaseButton = produtoDiv.querySelector('.increase-quantity');
                    const quantityDisplay = produtoDiv.querySelector('.product-quantity');

                    decreaseButton.addEventListener('click', function () {
                        let quantity = parseInt(quantityDisplay.textContent);
                        if (quantity > 1) {
                            quantity--;
                            quantityDisplay.textContent = quantity;
                        }
                    });

                    increaseButton.addEventListener('click', function () {
                        let quantity = parseInt(quantityDisplay.textContent);
                        quantity++;
                        quantityDisplay.textContent = quantity;
                    });

                    // Adicionar evento de clique ao botão "Adicionar ao Carrinho"
                    const botao = produtoDiv.querySelector('.add-to-cart');
                    if (botao) {
                        botao.addEventListener('click', function () {
                            const produtoId = this.getAttribute('data-id');
                            const quantidade = parseInt(quantityDisplay.textContent);
                            adicionarAoCarrinho(produtoId, quantidade);
                        });
                    }
                });
            } catch (error) {
                console.error('Erro ao processar JSON:', error);
            }
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
});

// Função para verificar o login antes de adicionar ao carrinho
function adicionarAoCarrinho(produtoId, quantidade) {
    fetch('adicionar_carrinho.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `produto_id=${produtoId}&quantidade=${quantidade}`
    })
    .then(response => response.text())
    .then(text => {
        try {
            const data = JSON.parse(text);
            if (!data.success) {
                exibirPopup(data.message, 'login.html');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Erro ao processar JSON:', error);
        }
    })
    .catch(error => console.error('Erro ao adicionar ao carrinho:', error));
}

// Função para exibir o pop-up de login
function exibirPopup(mensagem, link) {
    // Cria o elemento de overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '1000';

    // Cria o conteúdo do pop-up
    const popup = document.createElement('div');
    popup.style.backgroundColor = '#fff';
    popup.style.padding = '20px';
    popup.style.borderRadius = '8px';
    popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    popup.style.textAlign = 'center';

    // Adiciona a mensagem
    const mensagemElem = document.createElement('p');
    mensagemElem.textContent = mensagem;
    popup.appendChild(mensagemElem);

    // Adiciona o botão de login
    const botaoLogin = document.createElement('a');
    botaoLogin.href = link;
    botaoLogin.textContent = 'Fazer Login';
    botaoLogin.style.display = 'inline-block';
    botaoLogin.style.marginTop = '10px';
    botaoLogin.style.padding = '10px 20px';
    botaoLogin.style.background = 'linear-gradient(90deg, rgba(86, 179, 233, 1) 16%, rgba(131, 42, 233, 1) 75%)';
    botaoLogin.style.color = '#fff';
    botaoLogin.style.textDecoration = 'none';
    botaoLogin.style.borderRadius = '5px';
    popup.appendChild(botaoLogin);

    // Adiciona o conteúdo ao overlay
    overlay.appendChild(popup);

    // Adiciona o overlay ao corpo do documento
    document.body.appendChild(overlay);

    // Remove o overlay ao clicar fora do pop-up
    overlay.addEventListener('click', function(event) {
        if (event.target === overlay) {
            document.body.removeChild(overlay);
        }
    });
}






