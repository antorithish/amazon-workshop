import { cart } from "../../scripts/oops-cart.js";

describe("the suite of add to cart:-", () => {
  it("the cart already exists", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          id: 1,
        },
      ]);
    });
    spyOn(localStorage, "setItem");

    cart.loadFromStorage();

    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].quantity).toEqual(2);
  });

  it("new cart was added", () => {
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });
    spyOn(localStorage, "setItem");

    cart.loadFromStorage();
    cart.addtocart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  }); 
});
