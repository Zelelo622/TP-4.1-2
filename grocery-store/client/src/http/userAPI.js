import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (first_name, second_name, phone, password) => {
    const { data } = await $host.post('api/user/registration', { first_name, second_name, phone, password })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (phone, password) => {
    const { data } = await $host.post('api/user/login', { phone, password })
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const { data } = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}