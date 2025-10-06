const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");


cartIcon.addEventListener("click", ()=> cart.classList.add("active"));
cartClose.addEventListener("click", ()=> cart.classList.remove("active"));








// get all add-to-cart buttons
const addCartButtons = document.querySelectorAll(".add-art");


// call addToCart function when button is clicked
addCartButtons.forEach(button => {
  button.addEventListener("click", event => {
    const productBox = event.target.closest(".product-box");
    addToCart(productBox);
  });
});

// function to add product into cart
const cartContent = document.querySelector(".cart-content");

function addToCart(productBox) {
        const productImgSrc = productBox.querySelector("img").src;
        const productTitle = productBox.querySelector(".product-title").innerText;
        const productPrice = productBox.querySelector(".price").innerText;

        // Check if product already exists in cart
        const cartItems = cartContent.querySelectorAll(".cart-product-title");
        for(let item of cartItems) {
            if (item.textContent === productTitle) {
                alert("This item is already in the cart");
                return;
            }
        }

        const cartBox = document.createElement("div");
        cartBox.classList.add("cart-box");
        cartBox.innerHTML = `
            <img src="${productImgSrc}" class="cart-img">
            <div class="cart-detail">
            <h2 class="cart-product-title">${productTitle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
                <button id="decrement">-</button>
                <span class="number">1</span>
                <button id="increment">+</button>
            </div>
            </div>
            <i class="ri-delete-bin-line cart-remove"></i>
        `;

        cartContent.appendChild(cartBox);

        //delete the item by clicking on delete icon
            cartBox.querySelector(".cart-remove").addEventListener("click", () => {
                cartBox.remove();
                updateTotalPrice();
                updateCartCount();
            })





        // increment or decrement of cart item p-2
            const incrementBtn = cartBox.querySelector("#increment");
            const decrementBtn = cartBox.querySelector("#decrement");
            const numberElement = cartBox.querySelector(".number");
            let quantity = parseInt(numberElement.textContent);

            incrementBtn.addEventListener("click", () => {
                quantity++;
                numberElement.textContent = quantity;

                decrementBtn.style.color = "#333";
                updateTotalPrice();   
            });

            decrementBtn.addEventListener("click", () => {
                if(quantity>1){
                quantity--;
                numberElement.textContent = quantity;

                if (quantity === 1) {
                    decrementBtn.style.color = "#999";
                }
                updateTotalPrice();
            }
            });

     updateTotalPrice();
     updateCartCount() ;
};

//calculate total price
const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;

    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");

        const price = priceElement.textContent.replace("$", "");
        const quantity = quantityElement.textContent;

        total += price * quantity ;
    });

    totalPriceElement.textContent = `$${total}`;
};

//cartcount badge
const cartItemCountBadge = document.querySelector(".cart-item-count");

function updateCartCount() {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    const count = cartBoxes.length;

    if(count > 0) {
        cartItemCountBadge.textContent = count;
        cartItemCountBadge.style.visibility = "visible";
    }else {
        cartItemCountBadge.style.visibility = "hidden";
    }
}



//buy now button

const buyNowButton = document.querySelector(".btn-buy");

buyNowButton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");

    if(cartBoxes.length === 0){
        alert("Your cart is empty.");
        return;
    }

    cartBoxes.forEach(cartBox => cartBox.remove()); 

    updateTotalPrice();
    updateCartCount();
    alert("Thanks for purchasing");
});
    

