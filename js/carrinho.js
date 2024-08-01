// Function to load cart items from localStorage
function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    let total = 0;

    cartItemsContainer.innerHTML = '';

    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-price">R$${item.price.toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(listItem);
        total += item.price;
    });

    cartTotal.innerText = total.toFixed(2);
}

// Call loadCartItems when the page loads
window.onload = loadCartItems;
