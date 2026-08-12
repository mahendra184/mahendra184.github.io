// ======================================
// MAHENDRA GHASAL BOOK STORE
// Shopping Cart JavaScript
// ======================================

let cart = [];


// ADD TO CART
function addToCart(name, price) {

  const existingBook = cart.find(book => book.name === name);

  if (existingBook) {
    existingBook.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  updateCart();

  alert(name + " has been added to your cart.");
}


// UPDATE CART
function updateCart() {

  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");

  cartItems.innerHTML = "";

  let total = 0;
  let count = 0;

  if (cart.length === 0) {

    cartItems.innerHTML =
      "<p>Your cart is empty.</p>";

  } else {

    cart.forEach((book, index) => {

      total += book.price * book.quantity;
      count += book.quantity;

      const item = document.createElement("div");

      item.className = "cart-item";

      item.innerHTML = `
        <div>
          <h3>${book.name}</h3>
          <p>₹${book.price} × ${book.quantity}</p>
        </div>

        <div class="quantity-controls">
          <button onclick="changeQuantity(${index}, -1)">−</button>

          <strong>${book.quantity}</strong>

          <button onclick="changeQuantity(${index}, 1)">+</button>
        </div>

        <button
          class="remove-btn"
          onclick="removeFromCart(${index})">
          Remove
        </button>
      `;

      cartItems.appendChild(item);
    });
  }

  cartCount.textContent = count;
  cartTotal.textContent = total;
}


// CHANGE QUANTITY
function changeQuantity(index, amount) {

  cart[index].quantity += amount;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}


// REMOVE BOOK
function removeFromCart(index) {

  cart.splice(index, 1);

  updateCart();
}


// OPEN CART
function openCart() {

  document.getElementById("cart-modal").style.display = "flex";

  updateCart();
}


// CLOSE CART
function closeCart() {

  document.getElementById("cart-modal").style.display = "none";
}


// CHECKOUT
function checkout() {

  if (cart.length === 0) {

    alert("Your cart is empty.");

    return;
  }

  let total = 0;

  cart.forEach(book => {
    total += book.price * book.quantity;
  });

  alert(
    "Thank you for shopping with Mahendra Ghasal Books!\n\n" +
    "Your order total is ₹" + total +
    ".\n\nCheckout/payment integration can be added next."
  );
}


// SEARCH BOOKS
function searchBooks() {

  const searchText =
    document.getElementById("search").value.toLowerCase();

  const books =
    document.querySelectorAll(".book-card");

  books.forEach(book => {

    const text = book.innerText.toLowerCase();

    if (text.includes(searchText)) {
      book.style.display = "block";
    } else {
      book.style.display = "none";
    }

  });
}


// FILTER BOOKS
function filterBooks(category) {

  const books =
    document.querySelectorAll(".book-card");

  books.forEach(book => {

    if (
      category === "all" ||
      book.dataset.category === category
    ) {

      book.style.display = "block";

    } else {

      book.style.display = "none";

    }

  });
}


// CONTACT FORM
function sendMessage(event) {

  event.preventDefault();

  alert(
    "Thank you for contacting Mahendra Ghasal Books!"
  );

  event.target.reset();
}


// CLOSE MODAL WHEN CLICKING OUTSIDE
window.addEventListener("click", function(event) {

  const modal =
    document.getElementById("cart-modal");

  if (event.target === modal) {
    closeCart();
  }

});


// INITIAL CART UPDATE
updateCart();
