let email = document.getElementById("email");
let password = document.getElementById("password");

let users = [];
async function fetchUserDetails() {
    let res = await fetch("https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/users.json");
    let data = await res.json();
    users = Object.entries(data);
}

fetchUserDetails();



// Save previous URL only if it's not the login page itself
if (document.referrer && !document.referrer.includes("userlogin.html")) {
    localStorage.setItem("previousURL", document.referrer);
}

let isLoggedIn = sessionStorage.getItem("isLoggedIn");
console.log(isLoggedIn)
if (isLoggedIn) {
    let previousURL = localStorage.getItem("previousURL");
    localStorage.removeItem("previousURL");
    window.location.href = previousURL;
}


document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    let currentUser = users.filter(user => user[1].email === email.value);

    if (currentUser.length === 0 || currentUser[0][1].password != password.value) {
        alert("Invalid Credentials");
        return;
    }
    console.log(currentUser)

    sessionStorage.setItem("userId", JSON.stringify(currentUser[0][0]));
    sessionStorage.setItem("isLoggedIn", true);

    // Retrieve the previous URL
    let previousURL = localStorage.getItem("previousURL");

    // If there's no previous URL, redirect to the dashboard
    if (!previousURL || previousURL.includes("userlogin.html")) {
        previousURL = "/B42_WEB_003_Web-Wizards/index.html";
    }

    // Clear previous URL from localStorage and redirect
    localStorage.removeItem("previousURL");
    window.location.href = previousURL;
});
