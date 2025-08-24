const products = [
  { id: 1, name: "Laptop", price: 999, image: "images/laptop.jpg" },
  { id: 2, name: "Headphones", price: 199, image: "images/headphones.jpg" },
  { id: 3, name: "Smartphone", price: 699, image: "images/phone.jpeg" },
  { id: 4, name: "Smartwatch", price: 299, image: "images/watch.jpg" },
  { id: 4, name: "Smartwatch", price: 10000, image: "images/ferrari.jpg" }
];

function loadProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) return;

  productList.innerHTML = products.map(p => `
    <div class="product">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join("");
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let product = products.find(p => p.id === id);
  let item = cart.find(p => p.id === id);

  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").innerText = cart.reduce((a, c) => a + c.qty, 0);
}

function loadCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  if (!cartItemsDiv) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cartItemsDiv.innerHTML = cart.map(item => {
    total += item.price * item.qty;
    return `
      <div class="cart-item">
        <h4>${item.name} (${item.qty})</h4>
        <p>$${item.price * item.qty}</p>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
  }).join("");

  document.getElementById("cart-total").innerText = total;
}

function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

function checkout() {
  alert("Thank you for your purchase! 🛍️");
  localStorage.removeItem("cart");
  loadCart();
  updateCartCount();
}

// Initialize
window.onload = () => {
  loadProducts();
  loadCart();
  updateCartCount();
};
