import { cart, addtocart, quantitycard } from "./cart.js";
import { products } from "../data/products.js";

const productsGrid = document.querySelector(".js-products-grid");

let productsHTML = "";

products.forEach((product) => {
  const ratingImage = `images/ratings/rating-${product.rating.stars * 10}.png`;
  const price = `$${(product.priceCents / 100).toFixed(2)}`;

  let quantityOptions = "";
  for (let i = 1; i <= 10; i++) {
    quantityOptions += `<option value="${i}"${i === 1 ? " selected" : ""}>${i}</option>`;
  }

  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}" />
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars" src="${ratingImage}" />
        <div class="product-rating-count link-primary">${product.rating.count}</div>
      </div>

      <div class="product-price">${price}</div>

      <div class="product-quantity-container">
        <select>
          ${quantityOptions}
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png" />
        Added
      </div>

      <button class="add-to-cart-button button-primary js-cart" data-product-id = "${product.id}">Add to Cart</button>
    </div>
  `;
});

productsGrid.innerHTML = productsHTML;

document.querySelectorAll(".js-cart").forEach((cartButton) => {
  cartButton.addEventListener("click", () => {
    const productName = cartButton.dataset.productId;
    addtocart(productName);
    quantitycard();
  });
});

quantitycard();
