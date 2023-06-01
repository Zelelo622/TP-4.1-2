import { $adminHost, $authHost, $courierHost, $host } from "./index";

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
  const { data } = await $authHost.get(`/api/order/${orderId}/products`);
  return data;
}

export const fetchAllOrders = async (page, limit) => {
  const query = `?page=${page}&limit=${limit}`;
  const { data } = await $adminHost.get(`/api/order/${query}`);
  return data;
}

export const fetchCourierOrders = async (page, limit) => {
  const query = `?page=${page}&limit=${limit}`;
  const { data } = await $courierHost.get(`/api/order/courier-order/${query}`);
  return data;
}

export const updateCourier = async (orderId, courierId) => {
  const { data } = await $adminHost.put(`/api/order/${orderId}/courier`, { courierId });
  return data;
}

export const updateStatus = async (orderId, status) => {
  const { data } = await $courierHost.put(`/api/order/${orderId}`, { status });
  return data;
}
