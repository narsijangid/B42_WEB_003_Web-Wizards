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
    data = Object.entries(data);
    console.log("Fetched data:", data);

    container.innerHTML = "";
    subTotalValue = 0;
    discountValue = 0;

    data.forEach((product) => {
      const productData = product[1];
      const productDiv = document.createElement("div");
      productDiv.classList.add("cart-product");

      productDiv.innerHTML = `
        <img src="${productData.thumbnail}" alt="${productData.title}">
        <div class="product-info">
            <p>${productData.title} - <span class="product-price">$${(productData.price * productData.quantity).toFixed(2)}</span></p>
            <p>Total Quantity:</p>
            <div class="product-quantity" data-id="${product[0]}" data-price="${productData.price}" data-discount="${productData.discountPercentage}">
              <i class="ri-subtract-line"></i>
              <input type="number" value="${productData.quantity}" min="1" readonly />
              <i class="ri-add-line"></i>
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
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function attachQuantityHandlers() {
  const quantityDivs = document.querySelectorAll(".product-quantity"); // Corrected class name
  
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


function updatePriceAndTotal(div, quantity, price, discountPercentage) {
  const productInfo = div.closest(".product-info");
  const priceSpan = productInfo.querySelector(".product-price"); // Select the correct span

  const newPrice = price * quantity;
  priceSpan.innerHTML = `$${newPrice.toFixed(2)}`; // Update price correctly

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
