document.getElementById('toggleButton').addEventListener('click', function() {
    var navbarLinks = document.getElementById('navbarLinks');
    navbarLinks.classList.toggle('active');
});

document.addEventListener("DOMContentLoaded", function() {
    fetch('get_produtos.php')
        .then(response => response.text()) // Obtém a resposta como texto para verificar o que está sendo retornado
        .then(text => {
            console.log("Resposta recebida:", text);

            try {
                const produtos = JSON.parse(text); // Tenta converter o texto para JSON
                console.log("Produtos:", produtos);

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
                        botaoAdicionar = `<button class="add-to-cart" data-price="${produto.preco}">Adicionar ao Carrinho</button>`;
                    } else {
                        mensagemEstoque = '<span class="estoque-indisponivel">Sem estoque</span>';
                    }

                    // Corrigir o caminho da imagem para evitar duplicação
                    const imageUrl = produto.imagem ? produto.imagem : 'https://via.placeholder.com/250x200';

                    console.log(`Imagem URL: ${imageUrl}`);

                    produtoDiv.innerHTML = `
                        <img src="${imageUrl}" alt="${produto.nome}" width="250px" height="200px">
                        <h3>${produto.nome}</h3>
                        <span class="price">R$ ${parseFloat(produto.preco).toFixed(2)}</span>
                        ${botaoAdicionar}
                        ${mensagemEstoque}
                    `;

                    // Adiciona o produto ao container da categoria correta
                    const categoria = produto.categoria;
                    if (categorias[categoria]) {
                        categorias[categoria].appendChild(produtoDiv);
                    } else {
                        console.error("Categoria não encontrada:", categoria);
                    }
                });
            } catch (error) {
                console.error('Erro ao processar JSON:', error);
            }
        })
        .catch(error => console.error('Erro ao carregar produtos:', error));
});







