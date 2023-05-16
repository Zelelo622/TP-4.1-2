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
  PRODUCT_ADD,
  PRODUCT_ORDER,
  PROFILE,
  REGISTRATION_ROUTE,
  RESET_PASS,
  SEARCH_PRODUCTS,
} from "./utils/consts";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Profile from "./pages/Profile";
import HistoryOrder from "./pages/HistoryOrder";
import ProductsOrder from "./pages/ProductsOrder";
import SearchProducts from "./pages/SearchProducts";
import PasswordReset from "./pages/PasswordReset";
import AdminAddProduct from "./pages/AdminAddProduct";

export const authRoutes = [
  {
    path: ORDER,
    Component: Order,
  },
  {
    path: PROFILE + "/:phone",
    Component: Profile,
  },
  {
    path: HISTORY_ORDER + "/:phone",
    Component: HistoryOrder,
  },
  {
    path: PRODUCT_ORDER + "/:id",
    Component: ProductsOrder,
  },
  {
    path: PRODUCT_ADD,
    Component: AdminAddProduct,
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
    path: RESET_PASS,
    Component: PasswordReset,
  },
  {
    path: HOME,
    Component: Home,
  },
  {
    path: SEARCH_PRODUCTS,
    Component: SearchProducts,
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
