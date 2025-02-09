const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.post('/save-product', (req, res) => {
    const productData = req.body;

    // Save the data to a JSON file
    fs.writeFileSync('products.json', JSON.stringify(productData, null, 2), 'utf-8');

    res.status(200).send('Product saved successfully');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
