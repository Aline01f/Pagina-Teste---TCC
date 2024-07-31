document.getElementById('toggleButton').addEventListener('click', function() {
    var navbarLinks = document.getElementById('navbarLinks');
    navbarLinks.classList.toggle('active');
});

const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
let total = 0;

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const price = parseFloat(this.getAttribute('data-price'));
        total += price;

        const itemName = this.parentElement.querySelector('h3').textContent;
        const itemElement = document.createElement('li');
        itemElement.textContent = `${itemName} - R$${price.toFixed(2)}`;
        cartItems.appendChild(itemElement);

        cartTotal.textContent = total.toFixed(2);
    });
});



// Get cart items from localStorage
function getCartItems() {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
}

// Save cart items to localStorage
function saveCartItems(cartItems) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Add item to the cart
function addToCart(item) {
    const cartItems = getCartItems();
    const existingItem = cartItems.find(cartItem => cartItem.name === item.name);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ ...item, quantity: 1 });
    }

    saveCartItems(cartItems);
    alert(`${item.name} adicionado ao carrinho!`);
}

// Update cart page
function updateCartPage() {
    const cartItems = getCartItems();
    const cartContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');

    if (!cartContainer) return;

    cartContainer.innerHTML = '';
    let total = 0;

    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>R$${item.price.toFixed(2)}</span>
            <span>${item.quantity}</span>
            <span>R$${itemTotal.toFixed(2)}</span>
            <button class="remove-item" data-name="${item.name}">X</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    if (cartSummary) {
        cartSummary.innerHTML = `R$${total.toFixed(2)}`;
    }

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (event) => {
            const itemName = event.target.getAttribute('data-name');
            removeCartItem(itemName);
        });
    });
}

// Remove item from the cart
function removeCartItem(itemName) {
    let cartItems = getCartItems();
    cartItems = cartItems.filter(item => item.name !== itemName);
    saveCartItems(cartItems);
    updateCartPage();
}

// Initialize cart page
function initCartPage() {
    updateCartPage();
}

// Event listener for Add to Cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (event) => {
        const item = {
            name: event.target.parentElement.querySelector('h3').textContent,
            price: parseFloat(event.target.getAttribute('data-price')),
            description: event.target.parentElement.querySelector('p').textContent
        };
        addToCart(item);
    });
});

// Initialize cart page on load
if (window.location.pathname.endsWith('carrinho.html')) {
    document.addEventListener('DOMContentLoaded', initCartPage);
}