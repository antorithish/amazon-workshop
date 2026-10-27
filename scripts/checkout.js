import { cart, getCartQuantity, removeFromCart,UpdateFromCart } from "./cart.js";
import { products } from "../data/products.js";
import { moneyConvert } from "./utils/utilis-money.js";

const orderSummary = document.querySelector(".js-order-summary");

let cartItemsHTML = "";

cart.forEach((cartItem) => {
  let matchingProduct;
  products.forEach((product) => {
    if (cartItem.productId === product.id) {
      matchingProduct = product;
    }
  });

  cartItemsHTML += `
    <div class="cart-item-container JS-removed-container-${cartItem.productId}">
      <div class="delivery-date">Delivery date: Tuesday, June 21</div>

      <div class="cart-item-details-grid">
        <img
          class="product-image"
          src="${matchingProduct.image}"
        />

        <div class="cart-item-details">
          <div class="product-name">${matchingProduct.name}</div>
          <div class="product-price">${moneyConvert(matchingProduct.priceCents)}</div>
          <div class="product-quantity">
            <span> Quantity: <span class="quantity-label change-value-${cartItem.productId}">${cartItem.quantity}</span> </span>
            <span class="update-quantity-link link-primary js-update-checkout-quantity" data-update-item="${cartItem.productId}">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-for-delete" data-remove-item="${cartItem.productId}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input
              type="radio"
              checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}"
            />
            <div>
              <div class="delivery-option-date">Tuesday, June 21</div>
              <div class="delivery-option-price">FREE Shipping</div>
            </div>
          </div>
          <div class="delivery-option">
            <input
              type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}"
            />
            <div>
              <div class="delivery-option-date">Wednesday, June 15</div>
              <div class="delivery-option-price">$4.99 - Shipping</div>
            </div>
          </div>
          <div class="delivery-option">
            <input
              type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}"
            />
            <div>
              <div class="delivery-option-date">Monday, June 13</div>
              <div class="delivery-option-price">$9.99 - Shipping</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

orderSummary.innerHTML = cartItemsHTML;

function updateCheckoutQuantity() {
  document.querySelector(".js-checkout-quantity").innerHTML =
    `${getCartQuantity()} items`;
}
updateCheckoutQuantity();

// for deleting in the checkout//
const deleteLinks = document.querySelectorAll(".js-for-delete");
deleteLinks.forEach((deleteLink) => {
  deleteLink.addEventListener("click", () => {
    const productId = deleteLink.dataset.removeItem;
    removeFromCart(productId);
    const removedContainer = document.querySelector(
      `.JS-removed-container-${productId}`
    );
    removedContainer.remove();
    updateCheckoutQuantity();
  });
});

// for updating in the checkout//
const updateLinks = document.querySelectorAll(".js-update-checkout-quantity");
updateLinks.forEach((updateLink) => {
  updateLink.addEventListener("click", () => {
    const productId = updateLink.dataset.updateItem;
    UpdateFromCart(productId);
    let newQuantity;
    cart.forEach((item) => {
      if (item.productId === productId) {
        newQuantity = item.quantity;
      }
    });
    const updatedLabel = document.querySelector(`.change-value-${productId}`);
    updatedLabel.innerHTML = newQuantity;
    updateCheckoutQuantity();
  });
});