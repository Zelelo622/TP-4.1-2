import { $authHost, $host } from "./index";

export const fetchCategorys = async () => {
    const { data } = await $host.get('api/category');
    return data;
}