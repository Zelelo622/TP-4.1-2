import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import {
  HOME,
  LOGIN_ROUTE,
  PRODUCT,
  PRODUCTS,
  REGISTRATION_ROUTE,
} from "./utils/consts";

export const authRoutes = [];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: HOME,
    Component: Home,
  },
  {
    path: PRODUCTS + "/:categoryId",
    Component: Products,
  },
  {
    path: PRODUCT + "/:name",
    Component: Product,
  },
];
