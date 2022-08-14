import { IFoodItem, IUser } from "./interfaces";

export type IUserState = {
  user: IUser | null;
  error: string;
};
export type ILoadingState = {
  loading: boolean;
};

export type IFoodItemState = {
  foodItems: IFoodItem[];
};

export type ICartItemState = {
  cartItems: IFoodItem[];
};
