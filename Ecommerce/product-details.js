let cart = [];

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  const backButton = document.querySelector('.back-button');
  backButton.addEventListener('click', () => {
    history.back();
  });

  fetchProductDetails(productId);
  setupNavigation();
  setupAuthModal();
  setupCartModal();
});

function fetchProductDetails(productId) {
  fetch(`https://dummyjson.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
      renderProductDetails(product);
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('product-container').innerHTML = 
        '<p>Error loading product data. Please try again later.</p>';
    });
}

function renderProductDetails(product) {
  const container = document.getElementById('product-container');
  const ratingStars = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));
  container.innerHTML = `
    <div class="product-details">
      <div class="product-image">
        <img src="${product.thumbnail}" alt="${product.title}">
      </div>
      <div class="product-info">
        <h1 class="product-title">${product.title}</h1>
        <p class="product-brand">Brand: ${product.brand}</p>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <p class="product-description">${product.description}</p>
        <div class="product-meta">
          <div class="product-rating">
            <span class="stars">${ratingStars}</span>
            <span>(${product.rating.toFixed(1)})</span>
          </div>
          <span class="product-stock">In Stock: ${product.stock}</span>
        </div>
        <button class="add-to-cart">Add to Cart</button>
      </div>
    </div>
  `;

  const addToCartBtn = container.querySelector('.add-to-cart');
  addToCartBtn.addEventListener('click', () => addToCart(product));
}

function setupNavigation() {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-links li');

  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');

    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = '';
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
      }
    });

    burger.classList.toggle('toggle');
  });
}

function setupAuthModal() {
  const modal = document.getElementById('modal');
  const loginBtn = document.getElementById('loginBtn');
  const signupBtn = document.getElementById('signupBtn');
  const closeBtn = document.querySelector('.close');
  const modalTitle = document.getElementById('modal-title');
  const submitBtn = document.getElementById('submit-btn');
  const authForm = document.getElementById('auth-form');

  function openModal(type) {
    modal.style.display = 'flex';
    modalTitle.textContent = type;
    submitBtn.textContent = type;
  }

  function closeModal() {
    modal.style.display = 'none';
  }

  loginBtn.addEventListener('click', () => openModal('Login'));
  signupBtn.addEventListener('click', () => openModal('Sign Up'));
  closeBtn.addEventListener('click', closeModal);

  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      closeModal();
    }
  });

  authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Form submitted');
    closeModal();
  });
}

function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCartCount();
  updateCartModal();
}

function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
}

function setupCartModal() {
  const cartIcon = document.querySelector('.cart-icon');
  const cartModal = document.getElementById('cart-modal');
  const closeBtn = cartModal.querySelector('.close');

  cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'flex';
    updateCartModal();
  });

  closeBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target == cartModal) {
      cartModal.style.display = 'none';
    }
  });
}

function updateCartModal() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <div class="cart-item-info">
        <div class="cart-item-title">${item.title}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
      </div>
      <div class="cart-item-quantity">
        <button class="quantity-btn minus" data-id="${item.id}">-</button>
        <span>${item.quantity}</span>
        <button class="quantity-btn plus" data-id="${item.id}">+</button>
      </div>
      <button class="remove-item" data-id="${item.id}">Remove</button>
    `;
    cartItems.appendChild(itemElement);

    total += item.price * item.quantity;
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;

  setupCartItemListeners();
}

function setupCartItemListeners() {
  const cartItems = document.getElementById('cart-items');

  cartItems.addEventListener('click', (e) => {
    const target = e.target;
    const itemId = parseInt(target.getAttribute('data-id'));

    if (target.classList.contains('minus')) {
      updateItemQuantity(itemId, -1);
    } else if (target.classList.contains('plus')) {
      updateItemQuantity(itemId, 1);
    } else if (target.classList.contains('remove-item')) {
      removeItemFromCart(itemId);
    }
  });
}

function updateItemQuantity(itemId, change) {
  const item = cart.find(item => item.id === itemId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeItemFromCart(itemId);
    } else {
      updateCartCount();
      updateCartModal();
    }
  }
}

function removeItemFromCart(itemId) {
  cart = cart.filter(item => item.id !== itemId);
  updateCartCount();
  updateCartModal();
}