import Auth from "./pages/Auth"
import Home from "./pages/Home"
import Products from "./pages/Products"
import { HOME, LOGIN_ROUTE, PRODUCTS, REGISTRATION_ROUTE } from "./utils/consts"

export const authRoutes = [
    
]

export const publicRoutes = [
    {
        path:LOGIN_ROUTE,
        Component: Auth
    },
    {
        path:REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: HOME,
        Component: Home
    },
    {
        path: PRODUCTS + '/:categoryId',
        Component: Products
    }
]