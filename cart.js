// Load cart and wishlist from LocalStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// Display Cart Items
function displayCart() {

    const cartContainer =
        document.getElementById("cartItems");

    const totalPrice =
        document.getElementById("totalPrice");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    let grandTotal = 0;

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <div class="alert alert-info text-center">
                🛒 Your cart is empty
            </div>
        `;

        if (totalPrice) {
            totalPrice.innerText = "0";
        }

        return;
    }

    cart.forEach((item, index) => {

        let itemTotal =
            item.price * item.quantity;

        grandTotal += itemTotal;

        cartContainer.innerHTML += `

        <div class="card mb-3 shadow-sm">

            <div class="row g-0 align-items-center">

                <div class="col-md-3 text-center p-2">

                    <img src="${item.image}"
                         class="img-fluid rounded"
                         style="height:120px; object-fit:cover;">

                </div>

                <div class="col-md-4">

                    <div class="card-body">

                        <h5>${item.name}</h5>

                        <p class="mb-1">
                            Price: ₹${item.price}
                        </p>

                        <p class="fw-bold text-success">
                            Total: ₹${itemTotal}
                        </p>

                    </div>

                </div>

                <div class="col-md-3 text-center">

                    <div class="btn-group">

                        <button class="btn btn-secondary"
                            onclick="decreaseQty(${index})">
                            -
                        </button>

                        <button class="btn btn-light">
                            ${item.quantity}
                        </button>

                        <button class="btn btn-secondary"
                            onclick="increaseQty(${index})">
                            +
                        </button>

                    </div>

                </div>

                <div class="col-md-2 text-center">

                    <button class="btn btn-danger"
                        onclick="removeItem(${index})">
                        Remove
                    </button>

                </div>

            </div>

        </div>

        `;
    });

    if (totalPrice) {

        totalPrice.innerText =
            grandTotal.toFixed(2);
    }
}

// Save Cart
function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    displayCart();
}

function saveWishlist() {
    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    updateWishlistCount();
}

// Increase Quantity
function increaseQty(index) {

    cart[index].quantity++;

    saveCart();
}

// Decrease Quantity
function decreaseQty(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);
    }

    saveCart();
}

// Remove Item
function removeItem(index) {

    cart.splice(index, 1);

    saveCart();
}

// Clear Cart
function clearCart() {

    if (confirm("Clear entire cart?")) {

        cart = [];

        localStorage.removeItem("cart");

        displayCart();

        updateCartCount();
    }
}

// Update Cart Badge
function updateCartCount() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let totalItems = 0;

    cart.forEach(item => {

        totalItems += item.quantity;
    });

    const badge =
        document.getElementById("cartCount");

    if (badge) {

        badge.innerText =
            totalItems;
    }
}

function updateWishlistCount() {
    let wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    const badge = document.getElementById("wishlistCount");
    if (badge) {
        badge.innerText = wishlistItems.length;
    }
}

// Add To Cart Function
function addToCart(name, price, image) {

    console.log('addToCart called:', name, price, image);

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: name, price: price, image: image, quantity: 1 });
    }

    saveCart();

    if (typeof showCartToast === 'function') {
        showCartToast(name);
    } else {
        alert(name + " added to cart!");
    }
}

function addToWishlist(name, price, image) {
    let existingItem = wishlist.find(item => item.name === name);

    if (existingItem) {
        return;
    }

    wishlist.push({ name: name, price: price, image: image });
    saveWishlist();
    if (typeof showWishlistToast === 'function') {
        showWishlistToast(name);
    }
}

function removeFromWishlist(index) {
    wishlist.splice(index, 1);
    saveWishlist();
}

// Buy Now Function
function buyNow(name, price, image) {

    console.log('buyNow called:', name, price, image);

    let existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name: name, price: price, image: image, quantity: 1 });
    }

    saveCart();

    window.location.href = "cart.html";
}

