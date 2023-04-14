export const handleAddToCart = (product) => {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  cartItems.push(product);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
