export const handleAddToCart = (product) => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const existingProductIndex = cartItems.findIndex(
    (item) => item.id === product.id
  );
  if (existingProductIndex !== -1) {
    cartItems[existingProductIndex].quantity += 1;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (cartItems, productId) => {
  const newCartItems = cartItems.filter((item) => item.id !== productId);
  localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  return newCartItems;
};

export const decreaseProduct = (cartItems, productId, newQuantity) => {
  const existingProductIndex = cartItems.findIndex(
    (item) => item.id === productId
  );
  if (existingProductIndex !== -1) {
    if (newQuantity === 0) {
      cartItems.splice(existingProductIndex, 1);
    } else {
      cartItems[existingProductIndex].quantity = newQuantity;
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    return cartItems;
  }
};

export const increaseProduct = (cartItems, productId, newQuantity) => {
  const existingProductIndex = cartItems.findIndex(
    (item) => item.id === productId
  );
  if (existingProductIndex !== -1) {
    cartItems[existingProductIndex].quantity = newQuantity;
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  return cartItems;
};

export const clearCart = () => {
  localStorage.removeItem("cartItems");
  return [];
};
