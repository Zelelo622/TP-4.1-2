import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import {
  CART,
  HOME,
  LOGIN_ROUTE,
  ORDER,
  PRODUCT,
  PRODUCTS,
  REGISTRATION_ROUTE,
} from "./utils/consts";
import Cart from "./pages/Cart";
import Order from "./pages/Order";

export const authRoutes = [
  {
      path: ORDER,
      Component: Order,
  }
]

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
  {
    path: CART,
    Component: Cart
  },
];
