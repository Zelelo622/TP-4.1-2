import axios from "axios";
import jwt_decode from "jwt-decode";

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $adminHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $courierHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
};

const adminInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwt_decode(token);
    const role = decodedToken.role;
    if (role !== "ADMIN") {
      throw new Error("Доступ запрещен. Требуется роль администратора.");
    }
  } else {
    throw new Error("Доступ запрещен.");
  }
  return config;
};

const courierInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwt_decode(token);
    const role = decodedToken.role;
    if (role !== "COURIER") {
      throw new Error("Доступ запрещен. Требуется роль курьера.");
    }
  } else {
    throw new Error("Доступ запрещен.");
  }
  return config;
};

$authHost.interceptors.request.use(authInterceptor);
$adminHost.interceptors.request.use(adminInterceptor);
$courierHost.interceptors.request.use(courierInterceptor);

export { $host, $authHost, $adminHost, $courierHost };
