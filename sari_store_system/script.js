/* =========================================================
   1. PRODUCT DATA
   ========================================================= */
const groceryItems = [
  { product_id: 1, product_name: "Dried Mangoes (200g)", product_price: 190 },
  { product_id: 2, product_name: "Banana Chips (200g)", product_price: 120 },
  { product_id: 3, product_name: "Tablea Chocolate (250g)", product_price: 200 },
  { product_id: 4, product_name: "Coconut Oil (500ml)", product_price: 180 },
  { product_id: 5, product_name: "Mango Jam (250g)", product_price: 160 },
  { product_id: 6, product_name: "Peanut Brittle (200g)", product_price: 150 },
  { product_id: 7, product_name: "Cashew Nuts (250g)", product_price: 280 },
  { product_id: 8, product_name: "Philippine Coffee Beans (250g)", product_price: 320 },
  { product_id: 9, product_name: "Native Vinegar (500ml)", product_price: 120 },
  { product_id: 10, product_name: "Philippine Honey (250ml)", product_price: 250 },
  { product_id: 11, product_name: "Coconut Sugar (500g)", product_price: 180 },
  { product_id: 12, product_name: "Rice Crackers (200g)", product_price: 100 },
  { product_id: 13, product_name: "Salted Fish (Danggit, 250g)", product_price: 220 },
  { product_id: 14, product_name: "Longganisa (Frozen, 500g)", product_price: 280 },
  { product_id: 15, product_name: "Tocino (Frozen, 500g)", product_price: 300 },
  { product_id: 16, product_name: "Chicharon (100g)", product_price: 120 },
  { product_id: 17, product_name: "Pandesal Pack (12 pcs)", product_price: 80 },
  { product_id: 18, product_name: "Native Brown Rice (1kg)", product_price: 90 },
  { product_id: 19, product_name: "White Rice (1kg)", product_price: 70 },
  { product_id: 20, product_name: "Corn Coffee (250g)", product_price: 150 },
  { product_id: 21, product_name: "Coconut Water (1L)", product_price: 100 },
  { product_id: 22, product_name: "Calamansi Juice (1L)", product_price: 120 },
  { product_id: 23, product_name: "Guava Jelly (250g)", product_price: 160 },
  { product_id: 24, product_name: "Bagoong (250g)", product_price: 90 },
  { product_id: 25, product_name: "Fish Sauce (Patis, 500ml)", product_price: 110 },
  { product_id: 26, product_name: "Soy Sauce (500ml)", product_price: 95 },
  { product_id: 27, product_name: "Native Salt (250g)", product_price: 50 },
  { product_id: 28, product_name: "Coconut Milk Powder (200g)", product_price: 140 },
  { product_id: 29, product_name: "Instant Noodles (Pack of 6)", product_price: 75 },
  { product_id: 30, product_name: "Native Cheese (Kesong Puti, 250g)", product_price: 180 },
  { product_id: 31, product_name: "Eggs (Dozen)", product_price: 90 },
  { product_id: 32, product_name: "Fresh Tilapia (1kg)", product_price: 160 },
  { product_id: 33, product_name: "Fresh Bangus (Milkfish, 1kg)", product_price: 180 },
  { product_id: 34, product_name: "Fresh Chicken (1kg)", product_price: 200 },
  { product_id: 35, product_name: "Fresh Pork (1kg)", product_price: 280 },
  { product_id: 36, product_name: "Fresh Beef (1kg)", product_price: 350 },
  { product_id: 37, product_name: "Native Vegetables Basket", product_price: 250 },
  { product_id: 38, product_name: "Bananas (1kg)", product_price: 60 },
  { product_id: 39, product_name: "Mangoes (1kg)", product_price: 120 },
  { product_id: 40, product_name: "Papaya (1kg)", product_price: 70 },
  { product_id: 41, product_name: "Pineapple (Whole)", product_price: 90 },
  { product_id: 42, product_name: "Coconut (Whole)", product_price: 50 },
  { product_id: 43, product_name: "Native Peanuts (250g)", product_price: 100 },
  { product_id: 44, product_name: "Camote (Sweet Potato, 1kg)", product_price: 80 },
  { product_id: 45, product_name: "Ube Halaya (250g)", product_price: 180 },
  { product_id: 46, product_name: "Leche Flan (Whole)", product_price: 250 },
  { product_id: 47, product_name: "Bibingka (Whole)", product_price: 200 },
  { product_id: 48, product_name: "Puto (Dozen)", product_price: 120 },
  { product_id: 49, product_name: "Kakanin Sampler Pack", product_price: 300 },
  { product_id: 50, product_name: "Native Chocolate Drink (Sikwate, 250ml)", product_price: 90 }
];

/* =========================================================
   2. APP STATE (just plain arrays/objects, no database)
   ========================================================= */
let cart = [];              // items the cashier is currently selling
let transactions = [];      // every completed sale, kept in memory
let transactionCounter = 1; // used to create simple Transaction IDs
let pendingQty = {};         // remembers the quantity picker for each product card

/* =========================================================
   3. HELPER FUNCTIONS
   ========================================================= */

// Formats a number as Philippine peso text, e.g. 1234.5 -> "₱1,234.50"
function formatPeso(amount) {
  return "₱" + amount.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Adds up price * quantity for every item in the cart                            // getCartTotal
function getCartTotal() {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].price * cart[i].qty;
  }
  return total;
}

/* =========================================================
   4. RENDERING THE PRODUCT GRID                                                                      / search bar
   ========================================================= */
function renderProducts(filterText) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  const search = (filterText || "").toLowerCase();

  groceryItems.forEach(function (item) {
    // simple search filter by product name
    if (search && item.product_name.toLowerCase().indexOf(search) === -1) {
      return;
    }

    if (pendingQty[item.product_id] === undefined) {                                                                          
      pendingQty[item.product_id] = 1;
    }

    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML =
      '<div class="product-card__name">' + item.product_name + "</div>" +                                //. Price product
      '<div class="product-card__price">' + formatPeso(item.product_price) + "</div>" +
      '<div class="product-card__controls">' +
        '<button class="qty-btn" data-action="minus" data-id="' + item.product_id + '">-</button>' +
        '<span class="qty-value" id="qty-' + item.product_id + '">' + pendingQty[item.product_id] + "</span>" +
        '<button class="qty-btn" data-action="plus" data-id="' + item.product_id + '">+</button>' +
      "</div>" +
      '<button class="add-btn" data-action="add" data-id="' + item.product_id + '">Add to Cart</button>';

    grid.appendChild(card);
  });
}

/* =========================================================
   5. CART LOGIC
   ========================================================= */
function addToCart(productId, quantity) {                                                              // Add to Cart button
  const product = groceryItems.find(function (p) { return p.product_id === productId; });
  if (!product) return;

  // if this product is already in the cart, just increase the quantity
  const existing = cart.find(function (c) { return c.product_id === productId; });
  if (existing) {
    existing.qty += quantity;
  } else {
    cart.push({
      product_id: product.product_id,
      name: product.product_name,
      price: product.product_price,
      qty: quantity
    });
  }

  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(function (c) { return c.product_id !== productId; });
  renderCart();
}

function renderCart() {
  const cartItemsEl = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");
  const cartBarText = document.getElementById("cartBarText");
  const checkoutBtn = document.getElementById("checkoutBtn");

  cartItemsEl.innerHTML = "";

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="empty-msg">No items yet. Tap a product to add it.</p>';
    checkoutBtn.disabled = true;
  } else {
    cart.forEach(function (item) {
      const subtotal = item.price * item.qty;
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML =
        '<div class="cart-item__info">' +
          '<span class="cart-item__name">' + item.name + "</span>" +
          '<span class="cart-item__meta">' + item.qty + " x " + formatPeso(item.price) + " = " + formatPeso(subtotal) + "</span>" +
        "</div>" +
        '<button class="cart-item__remove" data-remove="' + item.product_id + '">✕</button>';
      cartItemsEl.appendChild(row);
    });
    checkoutBtn.disabled = false;
  }

  const total = getCartTotal();
  cartTotalEl.textContent = formatPeso(total);

  const itemCount = cart.reduce(function (sum, c) { return sum + c.qty; }, 0);
  cartBarText.textContent = itemCount === 0
    ? "Cart is empty"
    : itemCount + " item(s) — " + formatPeso(total);
}

/* =========================================================
   6. CHECKOUT + PAYMENT
   ========================================================= */
function openCheckout() {                                                                  // checkout button
  const subtotal = getCartTotal();
  const discount = subtotal > 1000 ? subtotal * 0.10 : 0;
  const total = subtotal - discount;

  document.getElementById("checkoutSubtotal").textContent = formatPeso(subtotal);
  document.getElementById("checkoutTotal").textContent = formatPeso(total);

  const discountLine = document.getElementById("discountLine");
  if (discount > 0) {
    discountLine.style.display = "flex";
    document.getElementById("checkoutDiscount").textContent = "-" + formatPeso(discount);
  } else {
    discountLine.style.display = "none";
  }

  document.getElementById("customerName").value = "";
  document.getElementById("paymentInput").value = "";
  document.getElementById("changeDisplay").textContent = "";
  document.getElementById("confirmCheckoutBtn").disabled = true;

  document.getElementById("checkoutModal").classList.add("open");
}

function updateChangeDisplay() {
  const subtotal = getCartTotal();                                                               
  const discount = subtotal > 1000 ? subtotal * 0.10 : 0;
  const total = subtotal - discount;

  const payment = parseFloat(document.getElementById("paymentInput").value) || 0;
  const changeEl = document.getElementById("changeDisplay");
  const confirmBtn = document.getElementById("confirmCheckoutBtn");

  if (payment >= total && total > 0) {
    const change = payment - total;
    changeEl.textContent = "Change: " + formatPeso(change);
    changeEl.style.color = "#234D3B";
    confirmBtn.disabled = false;
  } else {
    changeEl.textContent = payment > 0 ? "Insufficient payment" : "";
    changeEl.style.color = "#D6482F";
    confirmBtn.disabled = true;
  }
}

function confirmCheckout() {                                                                           // receipt
  const subtotal = getCartTotal();
  const discount = subtotal > 1000 ? subtotal * 0.10 : 0;
  const total = subtotal - discount;
  const payment = parseFloat(document.getElementById("paymentInput").value) || 0;
  const change = payment - total;
  const customerName = document.getElementById("customerName").value.trim() || "Walk-in customer";

  const transaction = {
    transaction_id: "TXN-" + String(transactionCounter).padStart(4, "0"),
    date: new Date().toLocaleString("en-PH"),
    customer: customerName,
    items: cart.map(function (c) {
      return {
        product_id: c.product_id,
        product_name: c.name,
        product_price: c.price,
        quantity: c.qty,
        subtotal: c.price * c.qty
      };
    }),
    subtotal: subtotal,
    discount: discount,
    total_amount_paid: payment,
    change_given: change
  };

  transactions.push(transaction);
  transactionCounter++;

  document.getElementById("checkoutModal").classList.remove("open");                                  //  showReceipt
  showReceipt(transaction);

  // reset cart and quantity pickers for next customer
  cart = [];
  pendingQty = {};
  renderCart();
  renderProducts(document.getElementById("searchInput").value);
  closeCartDrawer();
  renderTransactions();
  renderReports();
}

/* =========================================================
   7. RECEIPT
   ========================================================= */
function showReceipt(transaction) {
  const receiptEl = document.getElementById("receiptContent");

  let itemsHtml = "";
  transaction.items.forEach(function (item) {                                             //   showReceipt
    itemsHtml +=
      '<div class="receipt-row"><span>' + item.quantity + "x " + item.product_name + "</span><span>" + formatPeso(item.subtotal) + "</span></div>";
  });

  receiptEl.innerHTML =
    "<h3>Aling Nena's Sari-Sari Store</h3>" +
    "<p>" + transaction.date + "</p>" +
    "<p>Customer: " + transaction.customer + "</p>" +
    "<hr>" +
    itemsHtml +
    "<hr>" +
    '<div class="receipt-row"><span>Subtotal</span><span>' + formatPeso(transaction.subtotal) + "</span></div>" +
    (transaction.discount > 0
      ? '<div class="receipt-row"><span>Discount</span><span>-' + formatPeso(transaction.discount) + "</span></div>"
      : "") +
    '<div class="receipt-row receipt-total"><span>TOTAL</span><span>' + formatPeso(transaction.subtotal - transaction.discount) + "</span></div>" +
    '<div class="receipt-row"><span>Cash</span><span>' + formatPeso(transaction.total_amount_paid) + "</span></div>" +
    '<div class="receipt-row"><span>Change</span><span>' + formatPeso(transaction.change_given) + "</span></div>" +
    "<hr>" +
    "<p>" + transaction.transaction_id + "</p>" +
    "<p>Salamat po sa inyong pagbili!</p>";

  document.getElementById("receiptModal").classList.add("open");
}

/* =========================================================
   8. TRANSACTIONS TAB
   ========================================================= */
function renderTransactions() {
  const list = document.getElementById("transactionList");
  list.innerHTML = "";

  if (transactions.length === 0) {
    list.innerHTML = '<p class="empty-msg">No transactions yet. Sell something in the Shop tab!</p>';
    return;
  }

  // show newest transaction first
  for (let i = transactions.length - 1; i >= 0; i--) {
    const t = transactions[i];

    let itemsText = t.items.map(function (item) {
      return item.quantity + "x " + item.product_name;
    }).join(", ");

    const card = document.createElement("div");
    card.className = "transaction-card";
    card.innerHTML =
      '<div class="transaction-card__header">' +
        '<span class="transaction-card__id">' + t.transaction_id + "</span>" +
        "<span>" + t.date + "</span>" +
      "</div>" +
      '<div class="transaction-card__items">' + itemsText + "</div>" +
      '<div class="transaction-card__footer">' +
        "<span>" + t.customer + "</span>" +
        "<span>" + formatPeso(t.subtotal - t.discount) + "</span>" +
      "</div>";
    list.appendChild(card);
  }
}

/* =========================================================
   9. REPORTS TAB
   ========================================================= */
function renderReports() {
  let totalSales = 0;
  const productCounts = {}; // product_name -> total quantity sold

  transactions.forEach(function (t) {
    totalSales += (t.subtotal - t.discount);
    t.items.forEach(function (item) {
      if (!productCounts[item.product_name]) {
        productCounts[item.product_name] = 0;
      }
      productCounts[item.product_name] += item.quantity;
    });
  });

  document.getElementById("reportTotalSales").textContent = formatPeso(totalSales);
  document.getElementById("reportTxnCount").textContent = transactions.length;

  let bestSeller = "—";
  let bestQty = 0;
  for (const name in productCounts) {
    if (productCounts[name] > bestQty) {
      bestQty = productCounts[name];
      bestSeller = name;
    }
  }
  document.getElementById("reportBestSeller").textContent =
    bestSeller === "—" ? "—" : bestSeller + " (" + bestQty + " sold)";
}

/* =========================================================
   10. CART DRAWER OPEN/CLOSE
   ========================================================= */
function openCartDrawer() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("drawerOverlay").classList.add("open");
}

function closeCartDrawer() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("drawerOverlay").classList.remove("open");
}

/* =========================================================
   11. EVENT WIRING (runs once the page has loaded)
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {

  renderProducts("");
  renderCart();
  renderTransactions();
  renderReports();

  // --- Tab switching ---
  document.querySelectorAll(".tab-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".tab-btn").forEach(function (b) { b.classList.remove("active"); });
      document.querySelectorAll(".tab-panel").forEach(function (p) { p.classList.remove("active"); });
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });

  // --- Search filter ---
  document.getElementById("searchInput").addEventListener("input", function (e) {
    renderProducts(e.target.value);
  });

  // --- Product grid clicks (qty +/-, add to cart) ---
  document.getElementById("productGrid").addEventListener("click", function (e) {
    const action = e.target.dataset.action;
    if (!action) return;

    const productId = parseInt(e.target.dataset.id, 10);

    if (action === "plus") {
      pendingQty[productId] = (pendingQty[productId] || 1) + 1;
      document.getElementById("qty-" + productId).textContent = pendingQty[productId];
    }

    if (action === "minus") {
      pendingQty[productId] = Math.max(1, (pendingQty[productId] || 1) - 1);
      document.getElementById("qty-" + productId).textContent = pendingQty[productId];
    }

    if (action === "add") {
      addToCart(productId, pendingQty[productId] || 1);
    }
  });

  // --- Cart drawer open/close ---
  document.getElementById("cartBar").addEventListener("click", openCartDrawer);
  document.getElementById("cartHandle").addEventListener("click", closeCartDrawer);
  document.getElementById("drawerOverlay").addEventListener("click", closeCartDrawer);

  // --- Remove item from cart ---
  document.getElementById("cartItems").addEventListener("click", function (e) {
    const removeId = e.target.dataset.remove;
    if (removeId) {
      removeFromCart(parseInt(removeId, 10));
    }
  });

  // --- Checkout modal ---                                                                                // buttons
  document.getElementById("checkoutBtn").addEventListener("click", openCheckout);
  document.getElementById("cancelCheckoutBtn").addEventListener("click", function () {
    document.getElementById("checkoutModal").classList.remove("open");
  });
  document.getElementById("paymentInput").addEventListener("input", updateChangeDisplay);
  document.getElementById("confirmCheckoutBtn").addEventListener("click", confirmCheckout);

  // --- Receipt modal ---
  document.getElementById("closeReceiptBtn").addEventListener("click", function () {
    document.getElementById("receiptModal").classList.remove("open");
  });

});