document.addEventListener("DOMContentLoaded", function () {
  const search = document.querySelector('#search-input');
  const categories = document.getElementById('categories');
  const cartIcon = document.querySelector(".ri-shopping-cart-line");
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  // Handle search button click
  document.getElementById('search-button').addEventListener('click', function () {
    let searchValue = search.value.trim();
    let categoriesValue = categories.value;

    if (searchValue) {
      document.querySelector("#search-input").value = "";  // Clear search input
      window.location.href = `B42_WEB_003_Web-Wizards/users/products/products.html?search=${encodeURIComponent(searchValue)}&category=${encodeURIComponent(categoriesValue)}`;
    }
  });

  // Handle cart icon click
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      window.location.href = "B42_WEB_003_Web-Wizards/users/cartAndpayment/cartAndPayment.html";
    });
  }

  // Handle user authentication status
  if (isLoggedIn === "true") {
    document.getElementById("auth_btns").style.display = "none";
    document.getElementById("user_btn").style.display = "flex";
  } else {
    document.getElementById("auth_btns").style.display = "flex";
    document.getElementById("user_btn").style.display = "none";
  }

  // Handle user button click to show logout options
  document.getElementById("user_btn").addEventListener("click", () => {
    const userDropdown = document.getElementById("user_dropdown_sec");
    userDropdown.style.display = userDropdown.style.display === "block" ? "none" : "block";
  });

  // Handle logout action
  document.getElementById("logout_btn").addEventListener("click", () => {
    sessionStorage.clear();
    window.location.href = "B42_WEB_003_Web-Wizards/index.html";
  });

  // Handle logo click to go back to home page
  document.querySelector(".logo").addEventListener('click', () => {
    window.location.href = "B42_WEB_003_Web-Wizards/index.html";
  });
});
