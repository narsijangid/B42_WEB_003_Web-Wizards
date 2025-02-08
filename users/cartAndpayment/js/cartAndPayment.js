let subTotal = document.getElementById("sub-total");
let discount = document.getElementById("discount");
let totalPrice = document.getElementById("total-price");

let subTotalValue = 0;
let discountValue = 0;
let totalPriceValue = 0;
let debounceTimeout;

async function fetchAndDisplayProducts() {
  const url = "https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json";
  const container = document.getElementById("products-container");

  try {
    const response = await fetch(url);
    let data = await response.json();
    if (!data) {
      container.innerHTML = `<p class="empty-cart">No products in the cart.</p>`;
      return;
    }
    data = Object.entries(data);

    console.log("Fetched data:", data);

    container.innerHTML = "";
    subTotalValue = 0;
    discountValue = 0;

    data.forEach((product) => {
      const productId = product[0];
      const productData = product[1];
      const productDiv = document.createElement("div");
      productDiv.classList.add("cart-product");
      productDiv.dataset.id = productId; // store product id for later use

      productDiv.innerHTML = `
        <img src="${productData.thumbnail}" alt="${productData.title}">
        <div class="product-info">
            <p>${productData.title} - <span class="product-price">$${(productData.price * productData.quantity).toFixed(2)}</span></p>
            <p>Total Quantity:</p>
            <div class="product-quantity-delete">
              <div class="product-quantity" data-id="${productId}" data-price="${productData.price}" data-discount="${productData.discountPercentage}">
                <i class="ri-subtract-line"></i>
                <input type="number" value="${productData.quantity}" min="1" readonly />
                <i class="ri-add-line"></i>
              </div>
              <i class="ri-delete-bin-6-line delete-product" data-id="${productId}" data-price="${productData.price}" data-quantity="${productData.quantity}" data-discount="${productData.discountPercentage}"></i>
            </div>
        </div>
      `;

      subTotalValue += productData.price * productData.quantity;
      discountValue += (productData.price * productData.quantity * productData.discountPercentage) / 100;

      container.appendChild(productDiv);
    });

    totalPriceValue = subTotalValue - discountValue;
    subTotal.innerHTML = `$${subTotalValue.toFixed(2)}`;
    discount.innerHTML = `$${discountValue.toFixed(2)}`;
    totalPrice.innerHTML = `$${totalPriceValue.toFixed(2)}`;

    attachQuantityHandlers();
    attachDeleteHandlers();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function attachQuantityHandlers() {
  const quantityDivs = document.querySelectorAll(".product-quantity");
  
  quantityDivs.forEach((div) => {
    const subtractButton = div.querySelector(".ri-subtract-line");
    const addButton = div.querySelector(".ri-add-line");
    const quantityInput = div.querySelector("input");
    const productId = div.dataset.id;
    const price = parseFloat(div.dataset.price);
    const discountPercentage = parseFloat(div.dataset.discount);

    subtractButton.addEventListener("click", () => {
      let currentQuantity = parseInt(quantityInput.value);
      if (currentQuantity > 1) {
        currentQuantity -= 1;
        quantityInput.value = currentQuantity;

        updatePriceAndTotal(div, currentQuantity, price, discountPercentage);
        debounceUpdateQuantity(productId, currentQuantity);
      }
    });

    addButton.addEventListener("click", () => {
      let currentQuantity = parseInt(quantityInput.value);
      currentQuantity += 1;
      quantityInput.value = currentQuantity;

      updatePriceAndTotal(div, currentQuantity, price, discountPercentage);
      debounceUpdateQuantity(productId, currentQuantity);
    });
  });
}

function attachDeleteHandlers() {
  const deleteButtons = document.querySelectorAll(".delete-product");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.id;
      // Remove the product from the UI.
      deleteProductFromUI(productId);
      // Recalculate totals based on what remains in the DOM.
      calculateTotals();
      // Send the DELETE request to remove the product from the API.
      deleteProductFromAPI(productId);
    });
  });
}

function deleteProductFromUI(productId) {
  const productDiv = document.querySelector(`.cart-product[data-id="${productId}"]`);
  if (productDiv) {
    productDiv.remove();
  }
}

async function deleteProductFromAPI(productId) {
  const url = `https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/cart/${productId}.json`;
  
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Product deleted successfully!");
    } else {
      console.error("Failed to delete product from API");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}

function updatePriceAndTotal(div, quantity, price, discountPercentage) {
  const productInfo = div.closest(".product-info");
  const priceSpan = productInfo.querySelector(".product-price");

  const newPrice = price * quantity;
  priceSpan.innerHTML = `$${newPrice.toFixed(2)}`;

  calculateTotals();
}

function calculateTotals() {
  const allProducts = document.querySelectorAll(".product-quantity");
  subTotalValue = 0;
  discountValue = 0;

  allProducts.forEach((div) => {
    const quantity = parseInt(div.querySelector("input").value);
    const price = parseFloat(div.dataset.price);
    const discountPercentage = parseFloat(div.dataset.discount);

    subTotalValue += price * quantity;
    discountValue += (price * quantity * discountPercentage) / 100;
  });

  totalPriceValue = subTotalValue - discountValue;
  // When no products remain, these values will naturally be 0.
  subTotal.innerHTML = `$${subTotalValue.toFixed(2)}`;
  discount.innerHTML = `$${discountValue.toFixed(2)}`;
  totalPrice.innerHTML = `$${totalPriceValue.toFixed(2)}`;
}

function debounceUpdateQuantity(productId, quantity) {
  clearTimeout(debounceTimeout);
  debounceTimeout = setTimeout(() => {
    updateQuantityInAPI(productId, quantity);
  }, 500);
}

async function updateQuantityInAPI(productId, newQuantity) {
  const url = `https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/cart/${productId}.json`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: newQuantity }),
    });

    if (response.ok) {
      console.log("Quantity updated successfully!");
    } else {
      console.error("Failed to update quantity in API");
    }
  } catch (error) {
    console.error("Error updating quantity:", error);
  }
}

fetchAndDisplayProducts();
