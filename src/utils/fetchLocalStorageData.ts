import { IUser } from "../types/interfaces";

export const fetchUserDataFromLocalStorage = () => {
  const userInfo = localStorage.getItem("user");
  if (userInfo != null) {
    const user: IUser = JSON.parse(userInfo);
    return user;
  }
  localStorage.clear();
  return null;
};

export const fetchCartFromLocalStorage = () => {
  const cartInfo = localStorage.getItem("cart");
  if (cartInfo != null) {
    const cart: number[] = JSON.parse(cartInfo);
    return cart;
  }
  localStorage.clear();
  return [];
};
