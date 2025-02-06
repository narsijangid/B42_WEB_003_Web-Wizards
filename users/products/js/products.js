const searchMessageBox = document.getElementById("search-value-display");
const searchCategory = document.getElementById("categories");
const searchInput = document.getElementById("search-input");

let products = [];
let filteredProducts = [];
let searchedProducts = [];

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
const searchValue = urlParams.get("search");

searchCategory.value = category;
searchInput.value = searchValue;

fetch(
    "https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
)
    .then((response) => response.json())
    .then((data) => {
        products = Object.values(data);
        searchedProducts = products;
        if (category !== "all") {
            searchedProducts = products.filter(p => p.category === category);
        }
        searchedProducts = searchedProducts.filter(p => p.title.toLowerCase().includes(searchValue.toLowerCase()));
        displayProducts();

        if (searchValue) {
            searchMessageBox.innerHTML = `${searchValue} <span>${searchedProducts.length}</span>`;
        }
    })
    .catch((error) => console.error("Error fetching data:", error));

function displayProducts() {
    filteredProducts = filteredProducts.length > 0 ? filteredProducts : searchedProducts; // Use filteredProducts or searchedProducts
    const productSection = document.getElementById("product-section");
    productSection.innerHTML = "";
    let productListDiv = document.createElement("div");
    productListDiv.classList.add("product-list-div");

    if (filteredProducts.length == 0) {
        productSection.innerHTML = `No products found.`;
    } else {
        filteredProducts.forEach((item) => {
            let productDiv = document.createElement("div");
            productDiv.innerHTML = `
            <img src="${item.thumbnail}" />
            <p id="item-category">${item.category}</p>
            <h3>${item.title}</h3>
            <div id="price-rating">
            <p id="price">$${item.price}</p>
            <p id="rate"><i class="ri-star-s-fill"></i>${item.rating}</p>
            </div>`;
            productListDiv.appendChild(productDiv);
        });
    }

    productSection.appendChild(productListDiv);
}

document
    .getElementById("search-button")
    .addEventListener("click", function () {
        let searchValue = document.querySelector("input").value;
        if (searchValue) {
            window.location.href = `Searchlist.html?search=${encodeURIComponent(searchValue)}`;
        }
    });

document.querySelector("button.sort-by").addEventListener("click", () => {
    document.querySelector(".sort-options").classList.toggle("show");
});

function sortItems(value) {
    filteredProducts = [...searchedProducts]; // Reset filtered products
    if (value === "sort-by-price-asc") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (value === "sort-by-price-desc") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (value === "sort-by-rating-asc") {
        filteredProducts.sort((a, b) => b.rating - a.rating);
    } else if (value === "sort-by-rating-desc") {
        filteredProducts.sort((a, b) => a.rating - b.rating);
    }
    displayProducts();
    document.querySelector(".sort-options").classList.remove("show");
}

document.querySelector(".sort-options").addEventListener("click", (e) => {
    if (e.target.tagName === "INPUT") {
        sortItems(e.target.id);
    }
});

document.querySelector(".price-filter").addEventListener("click", (e) => {
    if (e.target.tagName === "LABEL" || e.target.tagName === "INPUT") {
        filterByPrice(e.target.id || e.target.getAttribute("for"));
    }
});

document.querySelector(".rating-filter").addEventListener("click", (e) => {
    if (e.target.tagName === "LABEL" || e.target.tagName === "INPUT") {
        filterByRating(e.target.id || e.target.getAttribute("for"));
    }
});

function filterByPrice(value) {
    filteredProducts = [...searchedProducts]; // Reset filtered products
    if (value === "price-25-above") {
        filteredProducts = filteredProducts.filter(p => p.price >= 25);
    } else if (value === "price-50-above") {
        filteredProducts = filteredProducts.filter(p => p.price >= 50);
    } else if (value === "price-75-above") {
        filteredProducts = filteredProducts.filter(p => p.price >= 75);
    } else if (value === "price-100-above") {
        filteredProducts = filteredProducts.filter(p => p.price >= 100);
    }

    displayProducts();
}

function filterByRating(value) {
    filteredProducts = [...searchedProducts]; // Reset filtered products
    if (value === "star-4-above") {
        filteredProducts = filteredProducts.filter(p => p.rating >= 4);
    } else if (value === "star-3-above") {
        filteredProducts = filteredProducts.filter(p => p.rating >= 3);
    } else if (value === "star-2-above") {
        filteredProducts = filteredProducts.filter(p => p.rating >= 2);
    } else if (value === "star-1-above") {
        filteredProducts = filteredProducts.filter(p => p.rating >= 1);
    }

    displayProducts();
}
