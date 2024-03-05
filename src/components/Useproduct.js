import axios from "axios";
import { useQuery } from "react-query";
export function getApi() {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
}
export function getApisingle(id) {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
}
export function getApicate() {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
}
export function getApisinglecate(id) {
  return axios.get(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
  );
}

export default function Useproduct(key, fun) {
  return useQuery(key, fun);
}
export function getApibrand() {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
}
export function getApisinglebrand(id) {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
}
