import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";
import { IFoodItem } from "../types/interfaces";

export const saveItem = async (data: IFoodItem) => {
  return await setDoc(doc(firestore, "foodItems", data.id), data, {
    merge: true,
  });
};
