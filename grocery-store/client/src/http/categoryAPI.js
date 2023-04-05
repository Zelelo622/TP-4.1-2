import { $authHost, $host } from "./index";

export const fetchCategorys = async () => {
    const { data } = await $host.get('api/category');
    return data;
}

export const fetchOneCategory = async (id) => {
    const { data } = await $host.get('api/category' + id);
    return data;
}
