# Frontend Mentor - Product list with cart solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d).

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- ✅ Add items to the cart and remove them
- ✅ Increase/decrease the number of items in the cart
- ✅ See an order confirmation modal when they click "Confirm Order"
- ✅ Reset their selections when they click "Start New Order"
- ✅ View the optimal layout for the interface depending on their device's screen size
- ✅ See hover and focus states for all interactive elements on the page

### Links

- Solution URL: [GitHub Repository](https://github.com/yourusername/product-list-with-cart)
- Live Site URL: [Live Demo](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JavaScript (ES6+)
- Tailwind CSS
- Responsive design with responsive images using `<picture>` element

### What I learned

This project reinforced several key concepts:

**1. Cart State Management**
Managing a cart state array and keeping the UI in sync with data changes:

```js
let cart = [];

function updateCartData(data) {
  cartItemsList.innerHTML = "";
  const html = data.map((item) => `...`).join("");
  cartItemsList.insertAdjacentHTML("beforeend", html);

  const totalItemsInCart = data.reduce((acc, item) => acc + item.quantity, 0);
  numberOfItemsInCart.textContent = totalItemsInCart;
}
```

**2. Event Delegation**
Using event delegation to handle dynamic button clicks across multiple product cards:

```js
productsContainer.addEventListener("click", function (e) {
  const addToCartBtn = e.target.closest(".add-to-cart-btn");
  const incrementBtn = e.target.closest(".increment-btn");
  const decrementBtn = e.target.closest(".decrement-btn");
  // Handle each button type accordingly
});
```

**3. Responsive Images**
Using the `<picture>` element to serve different image sizes based on device viewport:

```html
<picture class="max-w-full w-full h-full rounded-2xl block">
  <source media="(min-width: 1024px)" srcset="${product.image.desktop}" />
  <source media="(min-width: 768px)" srcset="${product.image.tablet}" />
  <img src="${product.image.mobile}" alt="${product.name}" />
</picture>
```

**4. Dynamic UI Updates**
Toggling UI elements based on cart state and showing/hiding modals with proper overflow handling:

```js
function updateCartUi() {
  emptyCartDiv.classList.add("hidden");
  itemsInCartState.classList.add("flex");
}

function showConfirmOrderModal() {
  confirmOrderSection.classList.add("flex");
  body.classList.add("overflow-hidden");
}
```

**5. Array Methods**
Using reduce, filter, and map to manage cart calculations and transformations efficiently.

## Author

- Frontend Mentor - [@yourusername](https://www.frontendmentor.io/profile/yourusername)
- GitHub - [@yourusername](https://github.com/yourusername)
