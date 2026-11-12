export function createCart(storageKey) {
  const cart = {
    cartItems: undefined,
    optionID: [
      {
        id: 1,
        days: 2,
        price: 0,
      },
      {
        id: 2,
        days: 5,
        price: 499,
      },
      {
        id: 3,
        days: 7,
        price: 999,
      },
    ],
       
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem(storageKey));

      if (!this.cartItems) {
        this.cartItems = [
          {
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            id: 1,
          },
          {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            id: 2,
          },
        ];
      }

      this.cartItems.forEach((cartItem) => {
        cartItem.id = cartItem.id ?? 1;
      });
    },

    option_matching(id) {
      return this.optionID.find((option) => option.id === id);
    },

    SavetoStorage() {
      localStorage.setItem(storageKey, JSON.stringify(this.cartItems));
    },

    addtocart(productName) {
      const matchingItem = this.cartItems.find(
        (product) => product.productId === productName,
      );

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productName,
          quantity: 1,
          id: 1,
        });
      }

      this.SavetoStorage();
    },

    getCartQuantity() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },

    quantitycard() {
      document.querySelector(".js-cartquantity").innerHTML =
        this.getCartQuantity();
      console.log(this.cartItems);
    },

    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(
        (item) => item.productId !== productId,
      );
      this.SavetoStorage();
    },

    UpdateFromCart(productId) {
      const matchingItem = this.cartItems.find(
        (item) => item.productId === productId,
      );

      if (matchingItem) {
        matchingItem.quantity += 1;
      }

      this.SavetoStorage();
    },

    UpdateDeliveryOption(productId, optionId) {
      const matchingProduct = this.cartItems.find(
        (item) => item.productId === productId,
      );

      if (!matchingProduct) return;

      matchingProduct.id = optionId;
      this.SavetoStorage();
    },
  };

  return cart;
}

export const cart = createCart("cart");
export const businessCart = createCart("BusinessCart");
export const personalCart = createCart("PersonalCart");
cart.loadFromStorage();
businessCart.loadFromStorage();
personalCart.loadFromStorage();
