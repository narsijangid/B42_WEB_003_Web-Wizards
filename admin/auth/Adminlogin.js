document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();  
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    // Store user data in sessionStorage
    sessionStorage.setItem("userEmail", email);
    sessionStorage.setItem("isLoggedIn", true);

    // Redirect to admin dashboard
    window.location.href = "admin-dashboard.html";
});
