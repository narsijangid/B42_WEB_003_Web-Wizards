const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');

const form = document.getElementById('register-form');

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
        console.log(result)
        sessionStorage.setItem("userId", result.name);
        sessionStorage.setItem("isLoggedIn", true);
        alert('User registered successfully');
        window.location.href = 'B42_WEB_003_Web-Wizards/admin/dashboard/dashboard.html';
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