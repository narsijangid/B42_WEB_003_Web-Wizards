(async function () {
    let API = await fetch("https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/products.json");
    let response = await API.json();
    console.log(response);
    let topRated = [...response].sort((a, b) => b.rating - a.rating).slice(0, 5);

    let mensProducts = response.filter((item) => item.category === "mens-shirts").slice(0, 5);

    let laptopProducts = response.filter((item) => item.category === "laptops").slice(0, 5);

    
    let categories = [
        { title: "Vehicles" },
        { title: "Furniture" },
        { title: "Home Decoration" },
        { title: "Mobile accessories" },
        { title: "Sunglasses" },
    ];

    let sections = [
        { title: "Top Picks", products: topRated },
        { title: "Categories", products: categories }, 
        { title: "Best Men's Products", products: mensProducts },
        { title: "Best Laptop Products", products: laptopProducts },
    ];

    displayData(sections);
})();

let mainTag = document.querySelector("main");

function displayData(sections) {

    const gradients = [
        "linear-gradient(135deg, #ff7e5f, #feb47b)", 
        "linear-gradient(135deg, #00b4db, #0083b0)", 
        "linear-gradient(135deg, #d66a6a, #eea6a6)", 
        "linear-gradient(135deg, #9c27b0, #e040fb)", 
        "linear-gradient(135deg, #ff9800, #ff5722)"  
    ];

    sections.forEach((section) => {
        let productSection = document.createElement("div");

        if (section.title === "Categories") {
            productSection.setAttribute("id", "categories-section"); 
            let categoriesContainer = document.createElement("div");
            categoriesContainer.classList.add("categories-container");

            section.products.forEach((category, index) => {
                let categoryDiv = document.createElement("div");
                categoryDiv.classList.add("category-box");

                categoryDiv.style.background = gradients[index % gradients.length];

                categoryDiv.innerHTML = `
                    <p>${category.title}</p>
                `;
                categoriesContainer.appendChild(categoryDiv);
            });

            productSection.appendChild(categoriesContainer);
        } else {
            productSection.setAttribute("id", "product-section"); 
            let productHeader = document.createElement("div");
            productHeader.classList.add("product-header");
            productHeader.innerHTML = `
                <h3>${section.title}</h3>
                <p>See more</p>
            `;
            productSection.appendChild(productHeader);

            let productListDiv = document.createElement("div");
            productListDiv.classList.add("product-list-div");

            section.products.forEach((item) => {
                let productDiv = document.createElement("div");
                productDiv.innerHTML = `
                    <img src="${item.thumbnail || ''}" alt="${item.title || 'Category'}" />
                    <p id="item-category">${item.category || ''}</p>
                    <h3>${item.title || ''}</h3>
                    <div id="price-rating">
                        <p id="price">${item.price ? `$${item.price}` : ''}</p>
                        <p id="rate">${item.rating ? `<i class="ri-star-s-fill"></i>${item.rating}` : ''}</p>
                    </div>`;
                productListDiv.appendChild(productDiv);
            });

            productSection.appendChild(productListDiv);
        }

        mainTag.appendChild(productSection);
    });
}

const wallpapers = [
    "https://img.freepik.com/free-vector/gradient-horizontal-banner-template-cyber-monday-sale_23-2150878651.jpg?t=st=1738851359~exp=1738854959~hmac=bee94ee741dfbd3946306390d703b3f63d74a891aff52ec805a8033215cc7d6c&w=1060",
    "https://img.freepik.com/free-psd/horizontal-banner-template-big-sale-with-woman-shopping-bags_23-2148786755.jpg?t=st=1738851287~exp=1738854887~hmac=01e87accc658b815934592ce9d1deb8660c46689b4525298a2e07e907576eaff&w=1060",
    "https://img.freepik.com/premium-psd/banner-template-online-fashion-sale_23-2148585403.jpg?w=1060",
    "https://img.freepik.com/free-psd/banner-with-online-shoppings-theme_23-2148561363.jpg?t=st=1738851242~exp=1738854842~hmac=119f3a6709dcaf639840c8fc6418b4cb74ea08a751c54bc0fc87f26b5fa94855&w=1060",
];

let index = 0;
const bg1 = document.getElementById("bg1");
const bg2 = document.getElementById("bg2");
let activeLayer = bg1; 

function changeWallpaper() {
    const nextWallpaper = wallpapers[index];
    
    const nextLayer = activeLayer === bg1 ? bg2 : bg1;

    nextLayer.style.backgroundImage = `url('${nextWallpaper}')`;
    nextLayer.classList.remove("fade-out"); 
    activeLayer.classList.add("fade-out"); 

    activeLayer = nextLayer;
    index = (index + 1) % wallpapers.length; 
}

bg1.style.backgroundImage = `url('${wallpapers[index]}')`;
index++;

setInterval(changeWallpaper, 5000);