import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (
  first_name,
  second_name,
  phone,
  password,
  passwordConfirmation,
  secret_word
) => {
  const { data } = await $host.post("api/user/registration", {
    first_name,
    second_name,
    phone,
    password,
    passwordConfirmation,
    secret_word,
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const login = async (phone, password) => {
  const { data } = await $host.post("api/user/login", { phone, password });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const verifyAccount = async (phone, secret_word) => {
  const { data } = await $host.post("api/user/verify", { phone, secret_word });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const resetPassword = async (password, passwordConfirmation) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Токен отсутствует");
  }
  const { data } = await $host.post(
    "api/user/resetPassword",
    { password, passwordConfirmation },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const fetchOneUser = async (phone) => {
  const { data } = await $authHost.get(`api/profile/${phone}`);
  return data;
};

export const updateUser = async (phone, user) => {
  const { data } = await $authHost.put(`api/profile/${phone}`, user);
  return data;
};

export const deleteUser = async (phone) => {
  const { data } = await $authHost.delete(`api/profile/${phone}`);
  return data;
};

export const fetchAllCouriers = async () => {
  const { data } = await $authHost.get('api/profile/couriers');
  return data;
};
