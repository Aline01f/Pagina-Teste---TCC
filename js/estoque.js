document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
    fetchProducts();

    // Adicionar Produto
    document.getElementById('addProductForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        formData.append('action', 'add');

        fetch('estoque.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert(data.message);
                fetchProducts();
            } else {
                alert(data.message);
            }
        })
        .catch(error => alert('Erro na comunicação com o servidor: ' + error.message));
    });

    // Remover Produto
    document.getElementById('removeProductForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        formData.append('action', 'remove');

        fetch('estoque.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert(data.message);
                fetchProducts();
            } else {
                alert(data.message);
            }
        })
        .catch(error => alert('Erro na comunicação com o servidor: ' + error.message));
    });

    // Atualizar Quantidade
    document.getElementById('updateStockForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        formData.append('action', 'update');

        fetch('estoque.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert(data.message);
                fetchProducts();
            } else {
                alert(data.message);
            }
        })
        .catch(error => alert('Erro na comunicação com o servidor: ' + error.message));
    });

    // Atualizar Imagem
    document.getElementById('updateImageForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        formData.append('action', 'updateImage');

        fetch('estoque.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert(data.message);
                fetchProducts();
            } else {
                alert(data.message);
            }
        })
        .catch(error => alert('Erro na comunicação com o servidor: ' + error.message));
    });

    // Atualizar Preço
    document.getElementById('updatePriceForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        formData.append('action', 'updatePrice');

        fetch('estoque.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert(data.message);
                fetchProducts();
            } else {
                alert(data.message);
            }
        })
        .catch(error => alert('Erro na comunicação com o servidor: ' + error.message));
    });

    function fetchCategories() {
        fetch('estoque.php?action=categories')
            .then(response => response.json())
            .then(categories => {
                const select = document.getElementById('addProductCategory');
                select.innerHTML = ''; // Limpa as opções existentes
                categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.CategoriaID;
                    option.textContent = category.Nome;
                    select.appendChild(option);
                });
            })
            .catch(error => alert('Erro ao carregar categorias: ' + error.message));
    }

    function fetchProducts() {
        fetch('estoque.php')
            .then(response => response.json())
            .then(products => {
                const tableBody = document.querySelector('#stockTable tbody');
                tableBody.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados
                products.forEach(item => {
                    // Garantir que item.preco seja um número
                    const price = parseFloat(item.preco);
                    const imageUrl = item.imagem ? './uploads/' + item.imagem : 'https://via.placeholder.com/100';
                    
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.id}</td>
                        <td>${item.nome}</td>
                        <td>${item.categoria_nome}</td>
                        <td>${isNaN(price) ? 'N/A' : price.toFixed(2)}</td>
                        <td>${item.quantidade}</td>
                        <td><img src="${imageUrl}" alt="${item.nome}" width="100"></td>
                        <td>${item.quantidade > 0 ? 'Sim' : 'Não'}</td>
                    `;
                    tableBody.appendChild(row);
                });
            })
            .catch(error => alert('Erro ao carregar produtos: ' + error.message));
    }
});



