import { ordersummary } from "../../scripts/checkout/checkout.js";
import { loadFromStorage,cart} from "../../scripts/cart.js";

describe("test suite for ordersummary", () => {
  it("display the cart", () => {
    document.querySelector(".js-test-container").innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-checkout-quantity"></div>
    `;

    const product1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const product2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: product1,
          quantity: 2,
          id: 1,
        },
        {
          productId: product2,
          quantity: 1,
          id: 2,
        },
      ]);
    });
    spyOn(localStorage, "setItem");

    loadFromStorage();
    ordersummary();

    expect(
      document.querySelectorAll(".cart-item-container").length
    ).toEqual(2);
    expect(
      document.querySelector(`.change-value-${product1}`).innerText
    ).toContain("2");
    expect(
      document.querySelector(`.change-value-${product2}`).innerText
    ).toContain("1");
  });
  document.querySelector(".js-test-container").innerHTML = "";

  it("remove the product",()=>{
        document.querySelector(".js-test-container").innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-checkout-quantity"></div>
      <div class = "payment-summary-money"></div>
    `;

    const product1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
    const product2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: product1,
          quantity: 2,
          id: 1,
        },
        {
          productId: product2,
          quantity: 1,
          id: 2,
        },
      ]);
    });
    spyOn(localStorage, "setItem");

    loadFromStorage();
    ordersummary();

    document.querySelector(`.js-delete-link-${product1}`).click();
    expect(
      document.querySelectorAll(".cart-item-container").length
    ).toEqual(1);
    expect(
      document.querySelector(`.js-cart-item-container-${product1}`)).toEqual(null);
    expect(document.querySelector(`.JS-removed-container-${product2}`) ).not.toEqual(null);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(product2);
    document.querySelector(".js-test-container").innerHTML = "";
  });

});  