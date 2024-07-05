const bar = document.querySelector(".bar");
const sideContent = document.querySelector(".side-content");
const container = document.querySelector(".container");

bar.addEventListener("click", () => sideContent.classList.toggle("active"));

const fetchAndRenderProducts = (url) => {
  fetch(url)
    .then((res) => res.json())
    .then(({ products }) => {
      products.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <a href="product.html?id=${product.id}" class="product-link">
            <div class="product-card">
              <img src="${product.thumbnail}" alt="${product.title}" class="product-image" />
              <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price}</p>
                <p class="product-category">${product.category}</p>
              </div>
            </div>
          </a>
        `;
        container.append(card);
      });
    });
};

const urls = [
  "https://dummyjson.com/products/category/beauty",
  "https://dummyjson.com/products/category/fragrances",
  "https://dummyjson.com/products/category/furniture",
  "https://dummyjson.com/products/category/groceries",
  "https://dummyjson.com/products/category/home-decoration",
  "https://dummyjson.com/products/category/kitchen-accessories",
  "https://dummyjson.com/products/category/laptops",
  "https://dummyjson.com/products/category/mens-shirts",
  "https://dummyjson.com/products/category/motorcycle",
  "https://dummyjson.com/products/category/skincare",
  "https://dummyjson.com/products/category/tops",
  "https://dummyjson.com/products/category/womens-bags",
  "https://dummyjson.com/products/category/tablets",
  "https://dummyjson.com/products/category/vehicle",
  "https://dummyjson.com/products/category/mobile-accessories",
  "https://dummyjson.com/products/category/skin-care",
];

urls.forEach((url) => fetchAndRenderProducts(url));

// Desktop search functionality
const inputSearch = document.querySelector("#input-search");
inputSearch.addEventListener("input", (e) => {
  const inputValue = e.target.value;
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const productTitle = card.querySelector(".product-title");
    if (
      productTitle.textContent.toLowerCase().includes(inputValue.toLowerCase())
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// Desktop filter functionality
const selectOption = document.querySelector("#select-option");
selectOption.addEventListener("change", (e) => {
  const selectValue = e.target.value;
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const productCategory = card.querySelector(".product-category");
    if (
      productCategory.textContent
        .toLowerCase()
        .includes(selectValue.toLowerCase())
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// Mobile search functionality
const inputSearchMobile = document.querySelector("#input-search-mobile");
inputSearchMobile.addEventListener("input", (e) => {
  const inputValue = e.target.value;
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const productTitle = card.querySelector(".product-title");
    if (
      productTitle.textContent.toLowerCase().includes(inputValue.toLowerCase())
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// Mobile filter functionality
const selectOptionMobile = document.querySelector("#select-option-mobile");
selectOptionMobile.addEventListener("change", (e) => {
  const selectValue = e.target.value;
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const productCategory = card.querySelector(".product-category");
    if (
      productCategory.textContent
        .toLowerCase()
        .includes(selectValue.toLowerCase())
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
