// Array de estoque inicial com caminhos para imagens
const stock = [
    { id: '001', name: 'Mini Pizza', quantity: 10, image: '' },
    { id: '002', name: 'Hamburguer Assado', quantity: 5, image: '' },
    { id: '003', name: 'Coxinha de frango', quantity: 0, image: '' },
    { id: '004', name: 'Enrolado', quantity: 8, image: '' },
    { id: '005', name: 'Quibe', quantity: 12, image: '' },
    { id: '006', name: 'Enrolado de salsicha', quantity: 7, image: '' },
    { id: '007', name: 'Tortinha de frango', quantity: 9, image: '' },
    { id: '008', name: 'Empada', quantity: 6, image: '' }
];

function renderStock() {
    const tableBody = document.querySelector('#stockTable tbody');
    tableBody.innerHTML = '';
    stock.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td><img src="${item.image || 'https://via.placeholder.com/100'}" alt="${item.name}"></td>
            <td>${item.quantity > 0 ? 'Sim' : 'Não'}</td>
        `;
        tableBody.appendChild(row);
    });
}

function addProduct() {
    const id = document.getElementById('addProductId').value.trim();
    const name = document.getElementById('addProductName').value.trim();
    const quantity = parseInt(document.getElementById('addProductQuantity').value, 10);
    const imageInput = document.getElementById('addProductImage');
    const image = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : '';

    if (!id || !name || isNaN(quantity) || quantity < 0) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    const existingProduct = stock.find(item => item.id === id);
    if (existingProduct) {
        alert('Produto com este ID já existe.');
        return;
    }

    stock.push({ id, name, quantity, image });
    alert('Produto adicionado com sucesso.');
    renderStock();
}

function removeProduct() {
    const id = document.getElementById('removeProductId').value.trim();

    if (!id) {
        alert('Por favor, insira o ID do produto para remover.');
        return;
    }

    const index = stock.findIndex(item => item.id === id);
    if (index > -1) {
        stock.splice(index, 1);
        alert('Produto removido com sucesso.');
        renderStock();
    } else {
        alert('Produto não encontrado.');
    }
}

function updateStock() {
    const id = document.getElementById('updateProductId').value.trim();
    const quantity = parseInt(document.getElementById('updateProductQuantity').value, 10);

    if (!id || isNaN(quantity) || quantity < 0) {
        alert('Por favor, insira um ID de produto válido e uma quantidade positiva.');
        return;
    }

    const product = stock.find(item => item.id === id);
    if (product) {
        product.quantity = quantity;
        alert(`Estoque do produto ${id} atualizado com sucesso.`);
    } else {
        alert('Produto não encontrado.');
    }

    renderStock();
}

function updateProductImage() {
    const id = document.getElementById('updateImageProductId').value.trim();
    const imageInput = document.getElementById('updateProductImage');
    const image = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : '';

    if (!id) {
        alert('Por favor, insira o ID do produto para atualizar a imagem.');
        return;
    }

    const product = stock.find(item => item.id === id);
    if (product) {
        product.image = image;
        alert(`Imagem do produto ${id} atualizada com sucesso.`);
    } else {
        alert('Produto não encontrado.');
    }

    renderStock();
}

// Renderiza a tabela de estoque ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    renderStock();
});
