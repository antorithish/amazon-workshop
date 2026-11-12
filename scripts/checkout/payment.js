import { cart } from "../oops-cart.js";
import { product_id } from "../../data/products.js";
import { moneyConvert } from "../utils/utilis-money.js";

export function paymentSummary() {
  let subtotalCents = 0;
  let shippingCents = 0;
  cart.cartItems.forEach((cartItem) => {
    const matchingProduct = product_id(cartItem.productId);
    if (!matchingProduct.priceCents) return;
    subtotalCents += matchingProduct.priceCents * cartItem.quantity;
    const matchingOption = cart.option_matching(cartItem.id);
    if (matchingOption) {
      shippingCents += matchingOption.price;
    }
  });
  const subtotalWithShipping = subtotalCents + shippingCents;
  const taxCents = Math.round(subtotalWithShipping * 0.1);
  const totalCents = subtotalWithShipping + taxCents;

  const moneyElements = document.querySelectorAll(".payment-summary-money");
  if (moneyElements.length < 5) return;

  moneyElements[0].innerHTML = moneyConvert(subtotalCents);
  moneyElements[1].innerHTML = moneyConvert(shippingCents);
  moneyElements[2].innerHTML = moneyConvert(subtotalWithShipping);
  moneyElements[3].innerHTML = moneyConvert(taxCents);
  moneyElements[4].innerHTML = moneyConvert(totalCents);
}
