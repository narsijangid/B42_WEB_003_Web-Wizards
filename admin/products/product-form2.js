// Function to add product data to Firebase
const addProductData = (productData) => {
  console.log("Sending data to Firebase:", productData);

  fetch('https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/products.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("Product added successfully:", data);
    alert("Product added successfully!");
  })
  .catch(error => {
    console.error("Error adding product:", error);
    alert("Error adding product. Check the console for details.");
  });
};

// Handle form submission
document.getElementById('submit-btn').addEventListener('click', function () {
  const linksString = document.getElementById('link-box').value;  // Input value with comma-separated links
  const linksArray = linksString.split(',').map(link => link.trim())
  console.log("Add Product button clicked!");

  // Collect form data
  const formData = {
    links: linksArray, 
    title: document.getElementById('title').value,
    price: document.getElementById('price').value,
    returnPolicy: document.getElementById('return-policy').value,
    shippingInfo: document.getElementById('shipping-info').value,
    stock: document.getElementById('stock').value,
    tags: document.getElementById('tags').value,
    warranty: document.getElementById('warranty').value,
    status: document.getElementById('status').value,
  };

  console.log("Form data collected:", formData);

  // Add product data to Firebase
  addProductData(formData);

  // Reset the form after submission
  document.getElementById('product-form').reset();
});


  
  
  
