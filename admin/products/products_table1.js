document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    setupSearchFilter();
});

let currentPage = 1;
let rowsPerPage = 10;
let allProducts = [];

// Fields to exclude from the table and search
const excludedFields = [
    'dimensions',
    'discountPercentage',
    'images',
    'meta',
    'rating',
    'reviews',
    'sku',
    'thumbnail',
    'weight',
    'description',
    'minimumOrderQuantity',
    'returnPolicy',
    'warrantyInformation',
    'shippingInformation'
    // Removed 'sellerId' to include it in the table
];

async function fetchProducts() {
    try {
        const response = await fetch('https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/products.json');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        allProducts = Array.isArray(data) ? data : Object.values(data);

        if (allProducts.length === 0) {
            document.getElementById('productsBody').innerHTML = '<tr><td colspan="6" style="text-align: center;">No products available</td></tr>';
            return;
        }

        generateTableHeaders(allProducts[0]);
        populateTable(allProducts);
        setupPagination(allProducts);
        setupItemsPerPageDropdown();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function generateTableHeaders(product) {
    const tableHead = document.getElementById('table-headers');
    tableHead.innerHTML = '';

    Object.keys(product).forEach(key => {
        if (!excludedFields.includes(key)) {
            const th = document.createElement('th');
            th.textContent = capitalize(key);
            tableHead.appendChild(th);
        }
    });

    const actionsTh = document.createElement('th');
    actionsTh.textContent = 'Actions';
    tableHead.appendChild(actionsTh);
}

function populateTable(products) {
    const tableBody = document.getElementById('productsBody');
    tableBody.innerHTML = '';

    if (products.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No products available</td></tr>';
        return;
    }

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    products.slice(start, end).forEach((product, index) => {
        const row = document.createElement('tr');

        Object.keys(product).forEach(key => {
            if (!excludedFields.includes(key)) {
                const cell = document.createElement('td');
                cell.textContent = product[key] || '';
                row.appendChild(cell);
            }
        });

        // Add action buttons
        const buttonCell = document.createElement('td');

        // Add button
        const addBtn = document.createElement('button');
        addBtn.textContent = 'Add';
        addBtn.classList.add('qty-btn');
        addBtn.onclick = () => updateQuantity(index, 'increase');

        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('qty-btn');
        removeBtn.onclick = () => updateQuantity(index, 'decrease');

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => deleteProduct(index);

        // Append buttons to the actions cell
        buttonCell.appendChild(addBtn);
        buttonCell.appendChild(removeBtn);
        buttonCell.appendChild(deleteBtn);
        row.appendChild(buttonCell);

        tableBody.appendChild(row);
    });
}

function setupPagination(products) {
    const paginationElement = document.getElementById('pagination');
    paginationElement.innerHTML = '';

    const totalPages = Math.ceil(products.length / rowsPerPage);

    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => changePage(currentPage - 1, products);
    paginationElement.appendChild(prevButton);

    const pageControls = document.createElement('div');
    pageControls.classList.add('page-controls');

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('page-btn');
        if (i === currentPage) pageButton.classList.add('active');
        pageButton.onclick = () => changePage(i, products);
        pageControls.appendChild(pageButton);
    }

    paginationElement.appendChild(pageControls);

    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.disabled = currentPage === totalPages;
    nextButton.onclick = () => changePage(currentPage + 1, products);
    paginationElement.appendChild(nextButton);
}

function changePage(page, products) {
    currentPage = page;
    populateTable(products);
    setupPagination(products);
}

function setupItemsPerPageDropdown() {
    const dropdown = document.getElementById('itemsPerPage');
    dropdown.value = rowsPerPage;

    dropdown.addEventListener('change', () => {
        rowsPerPage = parseInt(dropdown.value);
        currentPage = 1;
        populateTable(allProducts);
        setupPagination(allProducts);
    });
}

function setupSearchFilter() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', () => filterProducts(searchInput.value.toLowerCase()));
}

function filterProducts(filter) {
    const filteredProducts = allProducts.filter(product => {
        return Object.keys(product).some(key => {
            if (excludedFields.includes(key)) return false;
            return String(product[key]).toLowerCase().includes(filter);
        });
    });

    populateTable(filteredProducts);
    setupPagination(filteredProducts);
}

function updateQuantity(index, action) {
    const product = allProducts[index];

    if (!product.stock) {
        alert('This product does not have a stock value.');
        return;
    }

    if (action === 'increase') {
        product.stock++;
    } else if (action === 'decrease' && product.stock > 0) {
        product.stock--;
    }

    populateTable(allProducts);
    setupPagination(allProducts);
}

function deleteProduct(index) {
    if (confirm('Are you sure you want to delete this product?')) {
        allProducts.splice(index, 1);
        populateTable(allProducts);
        setupPagination(allProducts);
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}





















