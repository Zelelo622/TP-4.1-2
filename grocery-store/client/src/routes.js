import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import {
  CART,
  HISTORY_ORDER,
  HOME,
  LOGIN_ROUTE,
  ORDER,
  PRODUCT,
  PRODUCTS,
  PROFILE,
  REGISTRATION_ROUTE,
} from "./utils/consts";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Profile from "./pages/Profile";

export const authRoutes = [
  {
    path: ORDER,
    Component: Order,
  },
  {
    path: PROFILE + "/:phone",
    Component: Profile,
  },
];

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
    Component: Cart,
  },
];
