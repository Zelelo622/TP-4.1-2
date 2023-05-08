import axios from "axios";
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
  const { data } = await $authHost.get(
    `api/order/${phone}?&page=${page}&limit=${limit}`
  );
  return data;
};
