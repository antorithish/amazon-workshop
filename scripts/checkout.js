import { cart, getCartQuantity, removeFromCart,UpdateFromCart,optionID } from "./cart.js";
import { products} from "../data/products.js";
import { moneyConvert } from "./utils/utilis-money.js";
import {data_conversation} from "./utils/utilis-data-conversation.js"
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
           ${cart_Details(cartItem.id,matchingProduct)}

                    
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



function cart_Details(id, matchingProduct) {
  let checkoutHtml = ""; 
  
  optionID.forEach((date) => { 
      const checked = checking_id(id, date.id); 
      const { for_less, function_price } = data_conversation(date.id, date.days, date.price);
      
      checkoutHtml += `
      <div class="delivery-option">
        <input
          type="radio"
          ${checked} 
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}"
        />
        <div>
          <div class="delivery-option-date">${for_less}</div>
          <div class="delivery-option-price">${function_price}</div>
        </div>
      </div>
      `;
  });
  return checkoutHtml;
  
  
}

function checking_id(id, orderId) {
  return id == orderId ? "checked" : ""; 
}
