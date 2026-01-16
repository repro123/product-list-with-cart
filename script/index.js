"use strict";
const productsContainer = document.querySelector("#productsContainer");
const emptyCartDiv = document.querySelector("#emptyCartState");
const itemsInCartState = document.querySelector("#itemsInCartState");
const cartItemsList = document.querySelector("#cartItems");
const numberOfItemsInCart = document.querySelector("#numberOfItemsInCart");
const totalPriceOfAllOrders = document.querySelector("#totalAmountOfAllOrders");

productsContainer.innerHTML = "";
cartItemsList.innerHTML = "";
let allProducts = [];

async function getInitialData() {
  const res = await fetch("data.JSON");
  if (!res.ok) throw new Error("Error fetching data");
  const data = await res.json();
  return data;
}

async function init() {
  allProducts = await getInitialData();
  renderProducts(allProducts);
}

init();

async function renderProducts(data) {
  try {
    data.forEach((product, i) => {
      const html = `
    <div class="card border border-Rose-100 rounded-2xl bg-Rose-50">
              <div class="imageContainer rounded-2xl border-2 h-64 border-transparent relative">
                <picture class="max-w-full w-full h-full rounded-2xl block">
                  <source
                    media="(min-width: 1024px)"
                    srcset="${product.image.desktop}"
                  />
                  <source
                    media="(min-width: 768px)"
                    srcset="${product.image.tablet}"
                  />
                  <img
                    src="${product.image.mobile}"
                    alt="${product.name}"
                    class="max-w-full rounded-2xl h-full object-cover w-full"
                  />
                </picture>
                <div class="absolute top-full left-1/2 -translate-1/2">
                  <button
                    class="w-48 h-full py-2 px-3 md:px-8 flex justify-center items-center gap-2 bg-white border rounded-full cursor-pointer hover:border-primary hover:text-primary whitespace-nowrap shadow add-to-cart-btn" data-id="${i}"
                  >
                    <img src="./assets/images/icon-add-to-cart.svg" alt="" />
                    <span>Add To Cart</span>
                  </button>
                  <div
                    class="w-48 h-full py-2 px-3  hidden justify-between items-center gap-2 bg-primary text-white border rounded-full whitespace-nowrap shadow controller-div"
                  >
                    <button
                      aria-label="remove one ${product.name} from cart"
                      class="rounded-full border p-2 cursor-pointer decrement-btn" data-id="${i}"
                    >
                      <img
                        src="./assets/images/icon-decrement-quantity.svg"
                        alt=""
                        class="size-3"
                      />
                    </button>
                    <span class="quantity-of-product">1</span>
                    <button
                      aria-label="add one more ${product.name} to cart"
                      class="rounded-full border p-2 cursor-pointer increment-btn" data-id="${i}"
                    >
                      <img
                        src="./assets/images/icon-increment-quantity.svg"
                        alt=""
                        class="size-3"
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div class="space-x-2 p-4 mt-4">
                <p class="font-light text-Rose-400">${product.category}</p>
                <p class="font-bold">${product.name}</p>
                <p class="text-primary font-semibold">$${product.price}</p>
              </div>
            </div>
    `;
      productsContainer.insertAdjacentHTML("beforeend", html);
    });
  } catch (error) {
    console.error(error, error.message);
    productsContainer.innerHTML = `<p>Could not fetch products: ${error.message}</p>`;
  }
}

let cart = [];

productsContainer.addEventListener("click", function (e) {
  const addToCartBtn = e.target.closest(".add-to-cart-btn");
  const incrementBtn = e.target.closest(".increment-btn");
  const decrementBtn = e.target.closest(".decrement-btn");
  if (addToCartBtn) {
    const card = addToCartBtn.closest(".card");
    console.log(card);
    const imageContainer = card.querySelector(".imageContainer");
    const controllerDiv = card.querySelector(".controller-div");
    const productId = addToCartBtn.dataset.id;
    const {
      name,
      price,
      image: { thumbnail },
    } = allProducts[productId];

    const selectedProduct = {
      name,
      price,
      thumbnail,
      id: productId,
      quantity: 1,
    };
    addToCart(selectedProduct);
    updateCartUi();
    updateCartData(cart);
    console.log(cart);

    addActiveBorder(imageContainer);
    updateButtonsVisibility(controllerDiv, addToCartBtn);
  }

  if (incrementBtn) {
    const card = incrementBtn.closest(".card");
    const productQtyText = card.querySelector(".quantity-of-product");
    console.log(cart);
    const increasedProductId = incrementBtn.dataset.id;
    const increasedProduct = cart.find(
      (item) => item.id === increasedProductId
    );
    if (increasedProduct) {
      increasedProduct.quantity++;
      productQtyText.textContent = increasedProduct.quantity;
      console.log(cart);
      updateCartData(cart);
    }
    console.log(increasedProduct);
  }

  if (decrementBtn) {
    const card = decrementBtn.closest(".card");
    const productQtyText = card.querySelector(".quantity-of-product");
    console.log(cart);
    const decreasedProductId = decrementBtn.dataset.id;
    const decreasedProduct = cart.find(
      (item) => item.id === decreasedProductId
    );
    if (decreasedProduct) {
      if (decreasedProduct.quantity == 1) {
        const imageContainer = card.querySelector(".imageContainer");
        const controllerDiv = card.querySelector(".controller-div");
        const addToCartBtn = card.querySelector(".add-to-cart-btn");

        const updatedCart = cart.filter(
          (products) => products.id !== decreasedProductId
        );
        cart = updatedCart;
        updateCartData(cart);

        removeActiveBorder(imageContainer);
        resetButtonsVisibility(controllerDiv, addToCartBtn);
        return;
      }
      decreasedProduct.quantity--;
      productQtyText.textContent = decreasedProduct.quantity;
      console.log(cart);
      updateCartData(cart);
    }
    console.log(decreasedProduct);
  }
});

function addActiveBorder(el) {
  el.classList.add("border-primary");
  el.classList.remove("border-transparent");
}

function removeActiveBorder(el) {
  el.classList.remove("border-primary");
  el.classList.add("border-transparent");
}

function updateButtonsVisibility(controller, addToCart) {
  controller.classList.remove("hidden");
  controller.classList.add("flex");
  addToCart.classList.remove("flex");
  addToCart.classList.add("hidden");
}

function resetButtonsVisibility(controller, addToCart) {
  controller.classList.add("hidden");
  controller.classList.remove("flex");
  addToCart.classList.add("flex");
  addToCart.classList.remove("hidden");
}

function updateCartUi() {
  emptyCartDiv.classList.add("hidden");
  emptyCartDiv.classList.remove("flex");
  itemsInCartState.classList.add("flex");
  itemsInCartState.classList.remove("hidden");
}

function updateCartData(data) {
  cartItemsList.innerHTML = "";
  const html = data
    .map(
      (item, i) => `
                <li class="flex items-center justify-between p-4">
                  <div class="flex flex-col gap-2">
                    <span class="font-bold"
                      >${item.name}</span
                    >
                    <div class="flex items-center gap-3 text-xs">
                      <span
                        id="quantityOfItemToBeBought"
                        class="text-primary font-bold"
                        >${item.quantity}x</span
                      >
                      <span id="priceOfItem">@ ${item.price.toFixed(2)}</span>
                      <span id="totalPriceOfItem">${(
                        item.price * item.quantity
                      ).toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    class="cursor-pointer border rounded-full border-Rose-300 hover:border-Rose-900" data-id=${i}
                    aria-label="Remove ${item.name} from cart"
                  >
                    <img
                      src="./assets/images/icon-remove-item.svg"
                      alt=""
                      class="size-3"
                    />
                  </button>
                </li>
  `
    )
    .join("");

  cartItemsList.insertAdjacentHTML("beforeend", html);

  const totalItemsInCart = data.reduce((acc, item) => acc + item.quantity, 0);

  const totalPriceOfCart = data
    .map((item) => item.price * item.quantity)
    .reduce((acc, total) => acc + total, 0);
  console.log(totalPriceOfCart);

  numberOfItemsInCart.textContent = totalItemsInCart;
  totalPriceOfAllOrders.textContent = totalPriceOfCart.toFixed(2);
}

function addToCart(data) {
  cart.push(data);
}
