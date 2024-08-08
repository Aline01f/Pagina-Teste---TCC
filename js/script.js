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
                        ${botaoAdicionar}
                        ${mensagemEstoque}
                    `;

                    const categoria = produto.categoria;
                    if (categorias[categoria]) {
                        categorias[categoria].appendChild(produtoDiv);
                    }

                    // Adicionar evento de clique ao botão, se ele existir
                    const botao = produtoDiv.querySelector('.add-to-cart');
                    if (botao) {
                        botao.addEventListener('click', function () {
                            const produtoId = this.getAttribute('data-id');
                            adicionarAoCarrinho(produtoId, 1); // Adiciona 1 item ao carrinho
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





