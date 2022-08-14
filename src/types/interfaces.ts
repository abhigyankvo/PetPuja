export enum AlertStatus {
  INPROGRESS = "inprogress",
  ERROR = "danger",
  SUCCESS = "success",
  DELETED = "deleted",
}
export interface IItem {
  title: string;
  calories?: number;
  price?: number;
  category?: string;
  imageAsset: string;
  alert: AlertStatus | null;
  alertMessage: string;
}
export interface IFoodItem {
  id: string;
  title: string;
  calories: number;
  imageUrl: string;
  price: number;
  category: string;
  qty: number;
}
export interface ICart {}

export type IUser = {
  displayName: string | null;
  email: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
};
