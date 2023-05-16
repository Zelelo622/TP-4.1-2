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

$authHost.interceptors.request.use(authInterceptor);
$adminHost.interceptors.request.use(adminInterceptor);

export { $host, $authHost, $adminHost };
