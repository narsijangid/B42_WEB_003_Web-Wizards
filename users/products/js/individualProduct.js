const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const sideImageContainer = document.getElementById('side_image_container');
const quantity = document.getElementById('quantity_box');
let item = [];

(async function () {
    const API = await fetch(`https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json`);
    const product = await API.json();
    item = product;
    if (product) {
        document.getElementById('product_sku').textContent = product.sku || "";
        document.getElementById('product_image').src = product.thumbnail || "https://www.svgrepo.com/show/508699/landscape-placeholder.svg";
        document.getElementById('product_title').textContent = product.title || "N/A";
        document.getElementById('product_rating').innerHTML = `<i class="ri-star-fill"></i> ` + (product.rating.toFixed(1) || "0") + " Ratings";
        document.getElementById('product_review').textContent = (product.reviews.length || "0") + " Reviews";
        document.getElementById('product_brand').innerHTML = `<span>Brand: </span>${product.brand || product.category}`;
        document.getElementById('product_category').innerHTML = `<span>Category: </span>${product.category}`;
        document.getElementById('product_tags').innerHTML = `<span>Tags: </span>${product.tags.join(", ")}`;
        document.getElementById('product_weight').innerHTML = `<span>Weight: </span>${product.weight * 100} g`;
        document.getElementById('product_warranty').innerHTML = `<span>Warranty: </span>${product.warrantyInformation}`;

        let description = product.description.trim().split(".").map(e => `<li>${e}</li>`);
        let seller = await fetchUser(product.seller_id);
        document.getElementById('product_description').innerHTML = description.slice(0, description.length - 1).join(" ");
        document.getElementById('product_stock').innerHTML = `<span>Stock: </span>${product.stock}`;
        document.getElementById('product_price').textContent = `$${product.price || "0.00"}`;
        document.getElementById('product_delivery').innerHTML = `<span>Shiping from </span>${seller.address}`;
        document.getElementById('product_delivery_time').innerHTML = `${product.shippingInformation}`;
        document.getElementById('seller_img').innerHTML = `${seller.name[0] + (seller.name.split(" ")[1] ? seller.name.split(" ")[1][0] : "")} `;
        document.getElementById('seller_info').innerHTML = `<h3>${seller.name}</h3><p>${seller.email}</p><button><i class="ri-store-2-line"></i> Visit Store</button>`;

        if (product.images.length > 0) {
            sideImageContainer.innerHTML = product.images.map(img => `<img src="${img}" alt="${product.title}">`).join("");
        }
    } else {
        console.error("Product not found");
    }
})();


const fetchUser = async (id) => {
    const API = await fetch(`https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/users/${id}.json`);
    const user = await API.json();
    return user;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addQty").addEventListener("click", () => {
        if (quantity.value < item.stock) quantity.value++;
    });
    document.getElementById("removeQty").addEventListener("click", () => {
        if (quantity.value > 1) quantity.value--;
    });
})

async function addToCart() {
    let data = {
        discountPercentage: item.discountPercentage,
        discountedTotal: (item.price - (item.price * (item.discountPercentage / 100))) * +quantity.value,
        price: item.price,
        quantity: +quantity.value,
        thumbnail: item.thumbnail,
        title: item.title,
        total: item.price * (+quantity.value),
        user_id: item.seller_id,
        product_id: productId
    }

    try {
        const response = await fetch('https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        alert("Item added to cart successfully!");
    } catch (e) {
        console.error(e);
        alert("Failed to add item to cart!");
    }
}

async function buyNow() {
    let data = {
        discountPercentage: item.discountPercentage,
        discountedTotal: (item.price - (item.price * (item.discountPercentage / 100))) * +quantity.value,
        price: item.price,
        quantity: +quantity.value,
        thumbnail: item.thumbnail,
        title: item.title,
        total: item.price * (+quantity.value),
        user_id: item.seller_id,
        product_id: productId
    }

    try {
        const response = await fetch('https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        window.location.href = "B42_WEB_003_Web-Wizards/users/cartAndpayment/cartAndPayment.html"
    } catch (e) {
        console.error(e);
        alert("Failed to buy product.");
    }
}