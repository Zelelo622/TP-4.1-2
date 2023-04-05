import { $authHost, $host } from "./index";

export const fetchProductByCategory = async (categoryId, filters) => {
  const { priceRange, isVegetarian, calRange } = filters;
  const query = `?categoryId=${categoryId}` +
                `${priceRange ? `&priceRange=${encodeURIComponent(priceRange)}` : ''}` +
                `${isVegetarian ? `&isVegetarian=${encodeURIComponent(isVegetarian)}` : ''}` +
                `${calRange ? `&calRange=${encodeURIComponent(calRange)}` : ''}`;
  const { data } = await $host.get(`api/product${query}`);
  return data;
}
