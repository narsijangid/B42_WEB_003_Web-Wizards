let productDiv = document.getElementById("product-section");
 
(async function() {
    let API = await fetch("https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/products.json");
    let response = await API.json();
    displayData(response);
})();

function displayData(response) {
    response.forEach((item) => {
        let singleProductDiv = document.createElement("div");
        singleProductDiv.setAttribute("id", "single-product-div");
        singleProductDiv.innerHTML = `
            <div id="product-image-div">
                <img src="${item.thumbnail}" />
            </div>
            <p id="product-brand">${item.brand}</p>
            <h3>${item.title}</h3>
            <div id="item-price-rate">
                <p>${item.price}</p>
                <p><img src=""/>${item.rating}</p>
            </div>`;
        productDiv.append(singleProductDiv);
    });
}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('search-button').addEventListener('click', function() {
        let searchValue = document.querySelector('input').value;
        if (searchValue) {
            window.location.href = `./users/products/Searchlist.html?search=${encodeURIComponent(searchValue)}`;
        }
    });
});