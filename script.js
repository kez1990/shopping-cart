const products = {
  electronics: [
    { id: 1, name: "Laptop", price: 999, image: "images/laptop.jpg" },
    { id: 2, name: "Headphones", price: 199, image: "images/headphones.jpg" },
    { id: 3, name: "Smartphone", price: 699, image: "images/phone.jpeg" },
    { id: 4, name: "Smartwatch", price: 299, image: "images/watch.jpg" },
    { id: 5, name: "Tablet", price: 499, image: "images/tablet.jpg" }
  ],
  clothing: [
    { id: 6, name: "T-Shirt", price: 29, image: "images/tshirt.jpg" },
    { id: 7, name: "Jeans", price: 59, image: "images/jeans.jpeg" },
    { id: 8, name: "Sneakers", price: 89, image: "images/sneakers.jpeg" },
    { id: 9, name: "Jacket", price: 129, image: "images/jacket.jpeg" },
    { id: 10, name: "Cap", price: 19, image: "images/cap.jpg" }
  ],
  cars: [
    { id: 11, name: "Sedan", price: 20000, image: "images/sedan.jpg" },
    { id: 12, name: "SUV", price: 35000, image: "images/suv.jpg" },
    { id: 13, name: "Sports Car", price: 60000, image: "images/ferrari.jpg" },
    { id: 14, name: "Truck", price: 45000, image: "images/truck.jpg" },
    { id: 15, name: "Convertible", price: 55000, image: "images/convertible.jpg" }
  ],
  homewear: [
    { id: 16, name: "Sofa", price: 799, image: "images/sofa.jpg" },
    { id: 17, name: "Dining Table", price: 999, image: "images/diningtable.jpg" },
    { id: 18, name: "Bed", price: 1200, image: "images/bed.jpg" },
    { id: 19, name: "Lamp", price: 89, image: "images/lamp.jpeg" },
    { id: 20, name: "Carpet", price: 199, image: "images/carpet.jpg" }
  ]
};

function loadProducts() {
  Object.keys(products).forEach(category => {
    const container = document.getElementById(category);
    if (!container) return;

    container.innerHTML = products[category].map(p => `
      <div class="product">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>$${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `).join("");
  });
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Find product across categories
  let product;
  for (let cat in products) {
    product = products[cat].find(p => p.id === id);
    if (product) break;
  }

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
