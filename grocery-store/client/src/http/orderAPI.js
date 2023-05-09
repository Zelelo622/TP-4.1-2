import { $authHost, $host } from "./index";

export const createOrder = async (
  userId,
  address,
  cartItems,
  totalPrice,
  totalQuantity
) => {
  const { data } = await $authHost.post("api/order", {
    userId,
    address,
    cartItems,
    totalPrice,
    totalQuantity,
  });
  return data;
};

export const fetchOneOrder = async (phone, page, limit) => {
  const query = `?page=${page}&limit=${limit}`;
  const { data } = await $authHost.get(`api/order/${phone}${query}`);
  return data;
};

export const fetchOrderProducts = async (orderId) => {
  const {data} = await $authHost.get(`/api/order/${orderId}/products`);
  return data;
}
