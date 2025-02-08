const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const form = document.getElementById('register-form');

// Get previous path from sessionStorage
const previousPath = sessionStorage.getItem("previousPath") || ('B42_WEB_003_Web-Wizards/index.html');

async function registerUser() {
    const data = {
        name: name.value,
        email: email.value,
        password: password.value
    };

    try {
        const response = await fetch('https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/users.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();

        sessionStorage.setItem("userEmail", email.value);
        sessionStorage.setItem("isLoggedIn", true);
        alert('User registered successfully');
        
        // Redirect to the previous path
        window.location.href = previousPath;
        
        // Delete the stored previous path
        sessionStorage.removeItem("previousPath");
    } catch (error) {
        alert('Error: ' + error.message);
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
if (!sessionStorage.getItem("previousPath")) {
    sessionStorage.setItem("previousPath", document.referrer);
}
