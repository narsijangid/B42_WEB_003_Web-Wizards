const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

(async function() {
    const API = await fetch(`https://b42web03webwizards-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json`);
    const product = await API.json(); 
console.log(product);
    if (product) {
        const mainDiv = document.querySelector(".main");
        mainDiv.innerHTML = `
            <section id="first-section">
                <div class="individual-product-image">
                    <img src="${product.thumbnail}" />
                </div>
            </section>

            <section id="second-section">
                <div class="individual-product-intro">
                    <p>Visit Thirtting_Store</p>
                    <h2>${product.title}</h2> <!-- Dynamic product name -->
                    <div class="indiv-rate-review">
                        <p>${product.rating} Ratings</p> <!-- Dynamic rating -->
                        <p>Reviews</p>
                    </div>
                </div>
            
                <div class="individual-product-about">
                    <p>About items</p>
                    <hr>
        
                    <div class="product-about-col">
                        <div class="details">
                            <p><span>Brand: </span>${product.brand}</p> <!-- Dynamic brand -->
                            <p><span>Category: </span>${product.category}</p> <!-- Dynamic category -->
                            <p><span>Condition: </span>${product.condition}</p> <!-- Dynamic condition -->
                        </div>
                        <div class="details">
                            <p><span>Color: </span>${product.color}</p> <!-- Dynamic color -->
                            <p><span>Material: </span>${product.material}</p> <!-- Dynamic material -->
                            <p><span>Heavy: </span>${product.weight}</p> <!-- Dynamic weight -->
                        </div>
                    </div>
                </div>
        
                <div class="individual-product-desc">
                    <h4>Description: </h4>
                    <p>${product.description}</p> <!-- Dynamic description -->
                    <p>Chat us if there is anything you need to ask about the product</p>
                </div>
        
                <div class="individual-shipping-details">
                    <h4>Shipping Information: </h4>
                    <p>Delivery: ${product.delivery}</p> <!-- Dynamic delivery info -->
                    <p>Shipping: ${product.shipping}</p> <!-- Dynamic shipping info -->
                    <p>Arrive: ${product.arrival}</p> <!-- Dynamic arrival info -->
                </div>
            </section>

            <section id="third-section">
                <div class="individual-product-order">
                    <h4>Set Order</h4>
                    <hr>
                 
                    <div class="individual-product-order-quantity">
                        <input type="number" placeholder="1" />
                        <p>Stock: ${product.stock}</p> <!-- Dynamic stock -->
                    </div>
                    <div class="individual-product-order-price">
                        <p>Total Price</p>
                        <p>$${product.price}</p> <!-- Dynamic price -->
                    </div>
                    <div class="individual-product-order-btn">
                        <button>Buy Now</button>
                        <button>Add to Cart</button>
                    </div>
                </div>
            </section>
        `;
    } else {
        console.error("Product not found");
    }
})();
