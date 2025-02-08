let orders = [];
(async function () {
    const res = await fetch("https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json");
    const data = await res.json();
    orders = Object.entries(data);
    document.getElementById("total_order").textContent = orders.length;
    document.getElementById("total_revenue").textContent = "$" + orders.reduce((a, b) => a[1].finalPrice + b[1].finalPrice);

    const date = new Date();
    const today = date.toISOString().split("T")[0];

    document.getElementById("today_sale").textContent = "$" + orders.filter(e => e[1].order_date.split("T")[0] == today).reduce((a, b) => a[1].finalPrice + b[1].finalPrice, 0).toFixed(2);

    const lastWeekStart = new Date();
    lastWeekStart.setDate(lastWeekStart.getDate() - 7); // Get date 7 days ago

    const lastWeekSales = orders
        .filter(order => new Date(order[1].date) >= lastWeekStart) // Filter last week's orders
        .reduce((total, order) => total + order[1].finalPrice, 0); // Sum up finalPrice

    document.getElementById("last_week_sale").textContent = "$" + lastWeekSales.toFixed(2);


    const table = document.getElementById("sales_details");
    table.innerHTML = "";
    orders.forEach((order) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src=${order[1].thumbnail} alt=${order[1].title}/></td>
            <td>${order[1].title}</td>
            <td>${order[1].quantity}</td>
            <td>${order[1].finalPrice}</td>
            <td>${order[1].status}</td>
            <td>${order[1].order_date.split("T")[0]}</td>
            <td><button onclick="gotoOrder(${order[0]})">See more</button></td>
            `
        table.appendChild(row);
    })


    const topSalesContainer = document.getElementById("top_sales_details");

    const productRes = await fetch("https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/products.json");
    const productData = await productRes.json();
    let products = Object.entries(productData);

    for (let i = 0; i < 8; i++) {
        const li = document.createElement("li");
        li.innerHTML = `
            <a href="#">
                <img src=${products[i][1].thumbnail} alt=${products[i][1].sku} />
                <span class="product">${products[i][1].title}</span>
            </a>
            <span class="price">$${products[i][1].price}</span>
            `;

        topSalesContainer.appendChild(li);
    }
})();

function gotoOrder(orderId) {
    window.location.href = `B42_WEB_003_Web-Wizards/admin/orders/orderdetail.html?orderId=${orderId}`;
}

const orderTable = document.getElementById("order-table");