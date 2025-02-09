let orders = [];

(async function () {
    const res = await fetch("https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json");
    const data = await res.json();

    if (!data) {
        console.warn("No order data found.");
        return;
    }

    orders = Object.entries(data);
    console.log(orders);

    // Fix: Correct reduce function
    document.getElementById("total_order").textContent = orders.length;
    document.getElementById("total_revenue").textContent = "$" + orders.reduce((total, order) => total + order[1].finalPrice, 0).toFixed(2);

    const date = new Date();
    const today = date.toISOString().split("T")[0];

    // Fix: Reduce function for today_sale
    document.getElementById("today_sale").textContent = "$" + orders
        .filter(order => order[1].order_date.split("T")[0] === today)
        .reduce((total, order) => total + order[1].finalPrice, 0)
        .toFixed(2);

    const lastWeekStart = new Date();
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);

  
    const lastWeekSales = orders
        .filter(order => new Date(order[1].order_date) >= lastWeekStart)
        .reduce((total, order) => total + order[1].finalPrice, 0);

    document.getElementById("last_week_sale").textContent = "$" + lastWeekSales.toFixed(2);

    
    const table = document.getElementById("sales_details");
    if (!table) return;

    table.innerHTML = "";
    orders.forEach((order) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><img src="${order[1].thumbnail}" alt="${order[1].title}"/></td>
            <td>${order[1].title}</td>
            <td>${order[1].quantity}</td>
            <td>$${order[1].finalPrice.toFixed(2)}</td>
            <td>${order[1].status}</td>
            <td>${order[1].order_date.split("T")[0]}</td>
            <td><button onclick="gotoOrder('${order[0]}')">See more</button></td>
        `;
        table.appendChild(row);
    });

    // Top sales section
    const topSalesContainer = document.getElementById("top_sales_details");
    if (!topSalesContainer) return;

    const productRes = await fetch("https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/products.json");
    const productData = await productRes.json();

    if (!productData) {
        console.warn("No product data found.");
        return;
    }

    let products = Object.entries(productData).slice(0, 8); // Limit to top 8

    products.forEach(product => {
        const li = document.createElement("li");
        li.innerHTML = `
            <a href="#">
                <img src="${product[1].thumbnail}" alt="${product[1].sku}" />
                <span class="product">${product[1].title}</span>
            </a>
            <span class="price">$${product[1].price.toFixed(2)}</span>
        `;

        topSalesContainer.appendChild(li);
    });
})();

function gotoOrder(orderId) {
    window.location.href = `B42_WEB_003_Web-Wizards/admin/orders/orderdetail.html?orderId=${orderId}`;
}
