export const cart = [];

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

export function quantitycard() {
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });
  document.querySelector(".js-cartquantity").innerHTML = cartQuantity;
  console.log(cart);
}
