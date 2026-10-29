
export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart){
  cart = [
  {
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2,
    id :1
  },
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    id :2 
  },
];
}

cart.forEach((cartItem) => {
  cartItem.id = cartItem.id ?? 1;
});

export const  optionID = [{
  id :1,
  days : 2 ,
  price : 0,
},
{
  id : 2,
  days : 5,
  price : 499
},
{
  id : 3,
  days : 7,
  price : 999
}]
function SavetoStorage(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

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
      id :1
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

export function removeFromCart(productId) {
  const newcart = [];
  cart.forEach((element) => {
    if (element.productId !== productId) {
      newcart.push(element);
    }
  });
  cart = newcart;
  SavetoStorage();
}


export function UpdateFromCart(productId){
  cart.forEach((cartvalue,index)=>{
    if (cartvalue.productId === productId){
      cartvalue.quantity = cartvalue.quantity+1      
    }
  });
  SavetoStorage();

}