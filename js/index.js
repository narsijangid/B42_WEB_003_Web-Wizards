
(async function() {
    let API = await fetch("https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/products.json")
    let response = await API.json()
    console.log(response)
    let topRated = [...response].sort((a, b) => b.rating - a.rating).slice(0, 5);

    let mensProducts = response.filter((item) => item.category === "mens-shirts").slice(0, 5);

    let laptopProducts = response.filter((item) => item.category === "laptops").slice(0, 5);

    let sections = [
        { title: "Top Picks", products: topRated },
        { title: "Best Men's Products", products: mensProducts },
        { title: "Best Laptop Products", products: laptopProducts },
    ];

    displayData(sections)
})()

let mainTag = document.querySelector("main"); 


function displayData(sections) {
    sections.forEach((section) => {
        let productSection = document.createElement("div");
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
                     <img src="${item.thumbnail}" />
            
            <p id="item-category">${item.category}</p>
            <h3>${item.title}</h3>
            <div id="price-rating">
                <p id="price">$${item.price}</p>
                <p id="rate"><i class="ri-star-s-fill"></i>${item.rating}</p>
</div> `;
               productListDiv.appendChild(productDiv);
           });
   
           productSection.appendChild(productListDiv);

           mainTag.appendChild(productSection);
       });
   }
