document.addEventListener("DOMContentLoaded", function() {
    updateCart();
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productName, price) {
    let product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity += 1;
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });
    }
    saveCart();
}

function updateCart() {
    let cartItemsContainer = document.getElementById("cart-items");
    let cartCount = document.getElementById("cart-count");
    let cartTotal = document.getElementById("cart-total");

    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = "";
    }

    let totalPrice = 0;
    let totalItems = 0;

    cart.forEach((item, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${item.name} - $${item.price} x ${item.quantity} 
                        <button onclick="removeFromCart(${index})">Remove</button>`;
        if (cartItemsContainer) {
            cartItemsContainer.appendChild(li);
        }
        totalPrice += item.price * item.quantity;
        totalItems += item.quantity;
    });

    if (cartCount) {
        cartCount.innerText = totalItems;
    }
    if (cartTotal) {
        cartTotal.innerText = totalPrice;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
}

function clearCart() {
    cart = [];
    saveCart();
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

// ** Updated Search Function (Fades out irrelevant products instead of hiding them) **
function searchProducts() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let products = document.querySelectorAll('.product');

    products.forEach(product => {
        let productName = product.getAttribute('data-name');
        if (productName.includes(input)) {
            product.style.opacity = "1";  // Fully visible if match found
        } else {
            product.style.opacity = "0.4"; // Faded but still in place
        }
    });
}
