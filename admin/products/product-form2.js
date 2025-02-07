// Import and configure Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js';

// Your Firebase Realtime Database URL
const DATABASE_URL = "https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/";

// Firebase configuration (you may need to add your actual API key and project details)
const firebaseConfig = {
    databaseURL: DATABASE_URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Handle form submission
document.getElementById('submit-btn').addEventListener('click', function () {
    // Collect form data
    const formData = new FormData(document.getElementById('product-form'));

    // Convert form data to JSON format
    const productData = {};
    formData.forEach((value, key) => {
        productData[key] = value;
    });

    // Save data to Firebase
    saveProductData(productData);

    // Optionally, clear the form after submission
    document.getElementById('product-form').reset();

    alert('Product added successfully!');
});

// Function to save product data to Firebase
function saveProductData(data) {
    const productsRef = ref(database, 'products');  // 'products' is the node in the database
    push(productsRef, data)
        .then(() => {
            console.log('Product data saved successfully');
        })
        .catch((error) => {
            console.error('Error saving product data:', error);
        });
}

