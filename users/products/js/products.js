const searchMessageBox = document.getElementById("search-value-display");
const searchCategory = document.getElementById("categories");
const searchInput = document.getElementById("search-input");

let products = [];
let filteredProducts = [];
let searchedProducts = [];

let currentPage = 1;
const itemsPerPage = 10;

// Retrieve URL parameters with defaults
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category") || "all";
const searchValue = urlParams.get("search") || "";

// Set the dropdown and search input values accordingly
searchCategory.value = category;
searchInput.value = searchValue;

fetch("https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/products.json")
    .then((response) => response.json())
    .then((data) => {
        products = Object.values(data);

        // If a specific category is passed (not "all"), filter by that category
        if (category !== "all") {
            searchedProducts = products.filter(p => p.category === category);
        } else {
            searchedProducts = products;
        }
        
        // If a search value exists, filter the products further based on the title
        if (searchValue) {
            searchedProducts = searchedProducts.filter(p => p.title.toLowerCase().includes(searchValue.toLowerCase()));
        }
        
        currentPage = 1; // Reset page before display
        displayProducts();

        // Display search and/or category information if available
        if (searchValue || category !== "all") {
            let message = "";
            if (searchValue) {
                message += searchValue;
            }
            if (category !== "all") {
                message += (message ? " - " : "")  + category;
            }
            searchMessageBox.innerHTML = `${message} <span>${searchedProducts.length}</span>`;
        }
    })
    .catch((error) => console.error("Error fetching data:", error));

function displayProducts() {
    // Use filteredProducts if available, otherwise use searchedProducts
    filteredProducts = filteredProducts.length > 0 ? filteredProducts : searchedProducts;

    const totalItems = filteredProducts.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = filteredProducts.slice(startIndex, endIndex);
    
    const productSection = document.getElementById("product-section");
    productSection.innerHTML = "";
    
    let productListDiv = document.createElement("div");
    productListDiv.classList.add("product-list-div");

    if (totalItems === 0) {
        productSection.innerHTML = `No products found.`;
    } else {
        itemsToDisplay.forEach((item) => {
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
        productSection.appendChild(productListDiv);

        // Create pagination controls if more than 1 page exists
        if (totalPages > 1) {
            const paginationDiv = document.createElement("div");
            paginationDiv.classList.add("pagination");
            for (let i = 1; i <= totalPages; i++) {
                const pageBtn = document.createElement("button");
                pageBtn.innerText = i;
                if (i === currentPage) {
                    pageBtn.classList.add("active");
                }
                pageBtn.addEventListener("click", () => {
                    currentPage = i;
                    displayProducts();
                });
                paginationDiv.appendChild(pageBtn);
            }
            productSection.appendChild(paginationDiv);
        }
    }
}

// Sorting Functionality
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
    currentPage = 1;
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
    currentPage = 1;
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
    currentPage = 1;
    displayProducts();
}
