let email = document.getElementById("email");
let password = document.getElementById("password");

let users = [];
async function fetchUserDetails() {
    let res = await fetch("https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/users.json");
    let data = await res.json();
    users = Object.entries(data);
}

fetchUserDetails();

document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(users)
    let currentUser = users.filter(user => user[1].email === email.value);

    console.log(email.value, password.value)

    if (currentUser.length === 0 || currentUser[0][1].password !== password.value) {
        alert("Invalid Credentials");
        return;
    }

    if (currentUser.length > 0) {
        sessionStorage.setItem("userEmail", email.value);
        sessionStorage.setItem("isLoggedIn", true);
        window.location.href = "../dashboard/dashboard.html";
    } else {
        alert("Invalid Credentials");
    }
});
