export const cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
  },
];

export function addtocart(productName) {
  let matchingItem;
  cart.forEach((product) => {
    if (productName === product.productId) {
      matchingItem = product;
    }
  });
  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productName,
      quantity: 1,
    });
  }
}

export function getCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  return cartQuantity;
}

export function quantitycard() {
  document.querySelector(".js-cartquantity").innerHTML = getCartQuantity();
  console.log(cart);
}
