
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('search-button').addEventListener('click', function () {
        let searchValue = document.querySelector('#search-input').value;
        if (searchValue) {
            document.querySelector("#search-input").value = "";
            window.location.href = `/B42_WEB_003_Web-Wizards/users/products/Searchlist.html?search=${encodeURIComponent(searchValue)}`;
        }
    });
});