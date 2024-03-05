import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";

export function Addtocard(productId) {
  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/cart`,
    { productId },
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
}
export function getcard() {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
}
export function Addtowish(productId) {
  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/wishlist`,
    { productId },
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
}

export function getwish() {
  return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
}
export function deletcard(id) {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
}
export function deletcards(id) {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
    headers: {
      token: localStorage.getItem("userToken"),
    },
  });
}
export function updatacard({ id, count }) {
  return axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    { count },
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
}
export function checkout({ id, shippingAddress }) {
  return axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`,
    { shippingAddress },
    {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    }
  );
}

export function UseCard1(fn) {
  const queryClient = useQueryClient();
  return useMutation(fn, {
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      queryClient.invalidateQueries("getcard");
    },
    onError: (data) => {
      toast.error(data?.data?.message);
    },
  });
}
export function UseCard2(fn) {
  const queryClient = useQueryClient();
  return useMutation(fn, {
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      queryClient.invalidateQueries("getwish");
    },
    onError: (data) => {
      toast.error(data?.data?.message);
    },
  });
}
export function Usecard(key, fun) {
  return useQuery(key, fun);
}
