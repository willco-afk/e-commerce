// Initialize cart items and total price from localStorage
const cartItemsContainer = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const totalPriceSpan = document.getElementById('totalPrice');

let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

// Function to generate product cards dynamically
const generateProducts = () => {
    const pokemonData = [
        { name: "Pikachu Plushie", imagePath: "ppl.png", price: 25 },
        { name: "Charizard Figurine", imagePath: "ccf.png", price: 35 },
        // Add more products as needed...
    ];

    const productGrid = document.getElementById('productGrid');
    
    pokemonData.forEach((product) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product', 'bg-white', 'p-4', 'rounded-lg', 'transition', 'hover:shadow-lg', 'hover:bg-gray-100', 'border', 'border-pink-300', 'relative');
        productDiv.innerHTML = `
            <img src="${product.imagePath}" alt="${product.name}" class="w-full h-40 object-cover rounded">
            <div class="product-name mt-2 text-center">${product.name}</div>
            <div class="product-price text-center text-pink-300">$${product.price}</div>
            <button class="mt-2 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
        `;
        productGrid.appendChild(productDiv);
    });
};

// Function to add a product to the cart
function addToCart(name, price) {
    cartItems.push({ name, price });
    totalPrice += price;

    // Update localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalPrice', totalPrice.toFixed(2));

    // Update cart display
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    cartItemsContainer.innerHTML = '';
    cartCount.innerText = cartItems.length;
    totalPriceSpan.innerText = totalPrice.toFixed(2);

    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `<span>${item.name}</span><span>$${item.price}</span>`;
        cartItemsContainer.appendChild(itemDiv);
    });
}

// Initial update on page load
updateCartDisplay();
generateProducts();