const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const form = document.getElementById('register-form');

// Get previous path from sessionStorage
const previousURL = sessionStorage.getItem("previousURL") || ('B42_WEB_003_Web-Wizards/index.html');

let isLoggedIn = sessionStorage.getItem("isLoggedIn");
if (isLoggedIn) {
    localStorage.removeItem("previousURL");
    window.location.href = previousURL;
}


async function registerUser() {
    const data = {
        name: name.value,
        email: email.value,
        password: password.value
    };

    console.log(data)
    try {
        const response = await fetch('https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/users.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();

        sessionStorage.setItem("userId", result.name);
        sessionStorage.setItem("isLoggedIn", true);
        alert('User registered successfully');

        // Redirect to the previous path
        window.location.href = previousURL;

        // Delete the stored previous path
        sessionStorage.removeItem("previousURL");
    } catch (error) {
        console.log('Error: ' + error.message);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (name.value === '' || email.value === '' || password.value === '') {
        alert('Please fill in all fields.');
        return;
    }
    registerUser();
});

// Store current path before redirecting to register page
if (!sessionStorage.getItem("previousURL")) {
    sessionStorage.setItem("previousURL", document.referrer);
}
