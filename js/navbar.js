let search = document.querySelector('#search-input');
let categories = document.getElementById('categories');

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('search-button').addEventListener('click', function () {
        let searchValue = search.value.trim();
        let categoriesValue = categories.value;
        if (categoriesValue == "all") { }
        if (searchValue) {
            document.querySelector("#search-input").value = "";
            window.location.href = `./users/products/products.html?search=${encodeURIComponent(searchValue)}&category=${encodeURIComponent(categoriesValue)}`;
        }
    });

    document.querySelector(".logo").addEventListener('click', () => {
        window.location.href = "../index.html";
    })
});