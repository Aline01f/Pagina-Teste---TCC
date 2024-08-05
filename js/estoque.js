document.addEventListener('DOMContentLoaded', () => {
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
        .then(response => response.text()) // Use .text() para ver o conteúdo bruto
        .then(text => {
            console.log(text); // Verifique o conteúdo retornado
            return JSON.parse(text); // Tente analisar o JSON manualmente
        })
        .then(data => {
            if (data.status === 'success') {
                alert('Produto adicionado com sucesso!');
                fetchProducts();
            } else {
                alert('Erro ao adicionar produto.');
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
        .then(response => response.text())
        .then(text => {
            console.log(text);
            return JSON.parse(text);
        })
        .then(data => {
            if (data.status === 'success') {
                alert('Produto removido com sucesso!');
                fetchProducts();
            } else {
                alert('Erro ao remover produto.');
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
        .then(response => response.text())
        .then(text => {
            console.log(text);
            return JSON.parse(text);
        })
        .then(data => {
            if (data.status === 'success') {
                alert('Estoque atualizado com sucesso!');
                fetchProducts();
            } else {
                alert('Erro ao atualizar estoque.');
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
        .then(response => response.text())
        .then(text => {
            console.log(text);
            return JSON.parse(text);
        })
        .then(data => {
            if (data.status === 'success') {
                alert('Imagem atualizada com sucesso!');
                fetchProducts();
            } else {
                alert('Erro ao atualizar imagem.');
            }
        })
        .catch(error => alert('Erro na comunicação com o servidor: ' + error.message));
    });
});

// Função para buscar e atualizar os produtos na tabela
function fetchProducts() {
    fetch('estoque.php')
        .then(response => response.text()) // Use .text() para ver o conteúdo bruto
        .then(text => {
            console.log(text);
            return JSON.parse(text); // Tente analisar o JSON manualmente
        })
        .then(products => {
            const tableBody = document.querySelector('#stockTable tbody');
            tableBody.innerHTML = '';
            products.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.id}</td>
                    <td>${item.nome}</td>
                    <td>${item.quantidade}</td>
                    <td><img src="${item.imagem ? './uploads/' + item.imagem : 'https://via.placeholder.com/100'}" alt="${item.nome}"></td>
                    <td>${item.quantidade > 0 ? 'Sim' : 'Não'}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => alert('Erro na comunicação com o servidor: ' + error.message));
}


