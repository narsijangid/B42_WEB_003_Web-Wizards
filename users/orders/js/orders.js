const apiUrl = "https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/";
let orders = [];
let filters = new Set();

const filterBtns = document.getElementById("filter-button");
const pagination = document.getElementById('pagination');
const tableBody = document.getElementById("orderTableBody");

document.addEventListener("DOMContentLoaded", () => {
    fetchOrders();
    document
        .querySelector(".search-bar input")
        .addEventListener("input", debounce(searchOrders, 300));
    document.querySelector("#filter-button").addEventListener("change", debounce(filterOrders, 300));
});

async function fetchOrders() {
    try {
        const response = await fetch(apiUrl + "orders.json");
        const fetchedOrders = await response.json();
        orders = Object.entries(fetchedOrders); // Convert the fetched object into an array
        // Populate the filters
        orders.forEach(o => {
            filters.add(o[1].category.toLowerCase());
        });

        filters.forEach(f => {
            let option = document.createElement("option");
            option.value = f;
            option.textContent = f.slice(0, 1).toUpperCase() + f.slice(1);
            filterBtns.appendChild(option);
        });

        paginateItems(); // Now that orders are fetched, initialize pagination
        displayOrders(orders); // Display orders after fetch
    } catch (error) {
        console.error("Error fetching orders:", error);
        tableBody.innerHTML = "<tr><td colspan='8'>Failed to load orders</td></tr>";
    }
}

function displayOrders(orders) {
    tableBody.innerHTML = "";
    if (orders && orders.length > 0) {
        orders.forEach((order) => {
            const row = document.createElement("tr");
            row.dataset.title = order[1].title.toLowerCase();
            row.dataset.category = order[1].category.toLowerCase();
            row.innerHTML = `
                    <td><img src="${order[1].thumbnail || "https://via.placeholder.com/50"}" alt="Product" height="40px" width="60"></td>
                    <td>${order[1].title}</td>
                    <td>${order[1].category}</td>
                    <td>${order[1].status}</td>
                    <td>${order[1].quantity}</td>
                    <td>$${order[1].totalPrice}</td>
                    <td><button class="view-btn" onclick="viewOrderDetails('${order[0]}')">View</button></td>
                `;
            tableBody.appendChild(row);
        });
    } else {
        tableBody.innerHTML = `  
                <td colspan="8">
                    <p style="text-align: center; font-weight: 700; margin-block: 1rem">No orders yet.</p>
                </td>
            `;
    }
}

function filterOrders() {
    const selectedCategory = document.querySelector("#filter-button").value.toLowerCase();
    let filteredOrders = orders;

    // Filter by category if a valid category is selected
    if (selectedCategory !== 'all') {
        filteredOrders = filteredOrders.filter(
            (order) => order[1].category.toLowerCase() === selectedCategory
        );
    }

    paginateItems(filteredOrders); // Update pagination after filtering
    displayOrders(filteredOrders); // Display the filtered orders
}

function searchOrders() {
    const searchQuery = document.querySelector(".search-bar input").value.toLowerCase();
    let filteredOrders = orders.filter(
        (order) =>
            order[1].title.toLowerCase().includes(searchQuery) ||
            order[1].category.toLowerCase().includes(searchQuery)
    );

    paginateItems(filteredOrders); // Update pagination after searching
    displayOrders(filteredOrders); // Display the searched orders
}

function debounce(func, delay) {
    let debounceTimer;
    return function () {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
}

document.querySelector(".search-bar input").addEventListener("keyup", debounce(searchOrders, 300));

document.querySelector("#filter-button").addEventListener("change", debounce(filterOrders, 300));

async function viewOrderDetails(orderId) {
    console.log("View details for order ID:", orderId);
    try {
        const order = await fetchData(apiUrl + "orders/" + orderId + ".json");
        const product = await fetchData(apiUrl + "products/" + order.product_id + ".json");
        const seller = await fetchData(apiUrl + "users/" + order.user_id + ".json");
        const user = await fetchData(apiUrl + "users/" + order.seller_id + ".json");
        console.log(order);
        console.log(product);
        console.log(seller);
        console.log(user);

        document.getElementById("order_status").innerHTML = order.status;
        document.getElementById("modal_order_image").src = order.thumbnail;
        document.getElementById("modal_order_title").textContent = order.title;
        document.getElementById("modal_order_sku").textContent = order.sku;
    } catch (err) {

    } finally {
        document.querySelector(".overlay").style.display = "flex";
        document.querySelector("#order_status_modal").style.display = "block";
    }
}

function closeOrderModal() {
    document.querySelector(".overlay").style.display = "none";
    document.querySelector("#order_status_modal").style.display = "none";
}


let currentPage = 1;
let totalItemsToShow = 10;

// Calculate total pages after orders are fetched
function paginateItems(filteredOrders = orders) {
    const totalPages = Math.ceil(filteredOrders.length / totalItemsToShow); // Calculate total pages
    const startIndex = (currentPage - 1) * totalItemsToShow;
    const endIndex = startIndex + totalItemsToShow;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);
    displayOrders(paginatedOrders);
    updatePaginationButtons(totalPages); // Update pagination buttons based on totalPages
}

function updatePaginationButtons(totalPages) {
    pagination.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;

        button.addEventListener('click', () => {
            currentPage = i;
            paginateItems();
        });

        if (i === currentPage) {
            button.classList.add('active');
        }

        pagination.appendChild(button);
    }
}

async function fetchData(url) {
    const res = await fetch(url);
    const data = await res.json();
    return data;
}