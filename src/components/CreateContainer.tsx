import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent, useState } from "react";
import {
  MdAttachMoney,
  MdCloudUpload,
  MdDelete,
  MdFastfood,
  MdFoodBank,
} from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setLoading } from "../features/loadingSlice";
import { categoriesData } from "../utils/data";
import Loader from "./Loader";
import { storage } from "../firebase.config";
import { v4 as uuidv4 } from "uuid";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { AlertStatus, IItem, IFoodItem } from "../types/interfaces";
import { saveItem } from "../utils/FirebaseFuntion";

const alertColor = {
  [AlertStatus.ERROR]: "bg-red-200 text-red-800",
  [AlertStatus.SUCCESS]: "bg-emerald-300 text-emerald-800 ",
  [AlertStatus.INPROGRESS]: "bg-purple-300 text-purple-800",
  [AlertStatus.DELETED]: "bg-purple-300 text-purple-800",
};
const CreateContainer = () => {
  const {
    loadingState: { loading },
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const initialState: IItem = {
    title: "",
    calories: NaN,
    price: NaN,
    imageAsset: "",
    category: "other",
    alert: null,
    alertMessage: "",
  };
  const [item, setItem] = useState<IItem>(initialState);

  const clearAlert = () => {
    setTimeout(() => {
      setItem((prev) => ({ ...prev, alert: null, alertMessage: "" }));
    }, 4000);
  };
  const setAlert = (alert: AlertStatus | null, alertMessage: string) => {
    setItem((prev) => ({ ...prev, alert, alertMessage }));
    clearAlert();
  };

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let modifiedValue: string | number = value;

    if (name === "calories" || name === "price") {
      modifiedValue = parseInt(value);
    }
    setItem({ ...item, [name]: modifiedValue });
  };
  const handleUploadImage = (e: any) => {
    dispatch(setLoading(true));
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        /**
         * Can add loading progress bar
         */
        /**
         * const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         */
      },
      (error) => {
        console.log(error);
        setAlert(AlertStatus.ERROR, "Error uploading image");
        dispatch(setLoading(false));
      },
      async () => {
        const donwloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setItem((prev) => ({
          ...prev,
          imageAsset: donwloadURL,
          alert: AlertStatus.SUCCESS,
          alertMessage: "Image uploaded successfully",
        }));
        dispatch(setLoading(false));
        clearAlert();
      }
    );
  };
  const handleDeleteImage = async () => {
    dispatch(setLoading(true));
    const deleteRef = ref(storage, item.imageAsset);
    await deleteObject(deleteRef);
    setItem((prev) => ({
      ...prev,
      imageAsset: "",
      alert: AlertStatus.DELETED,
      alertMessage: "Image deleted successfully",
    }));
    dispatch(setLoading(false));
    clearAlert();
  };
  const handleSubmit = async (e: any) => {
    dispatch(setLoading(true));
    try {
      if (
        item.title &&
        item.calories &&
        item.imageAsset &&
        item.price &&
        item.category
      ) {
        const newItem: IFoodItem = {
          id: uuidv4(),
          title: item.title,
          calories: item.calories,
          imageUrl: item.imageAsset,
          price: item.price,
          category: item.category,
          qty: 1,
        };
        await saveItem(newItem);
        dispatch(setLoading(false));
        setItem({
          ...initialState,
          alert: AlertStatus.SUCCESS,
          alertMessage: "Item added successfully 😊",
        });
        clearAlert();
      } else {
        setAlert(AlertStatus.ERROR, "Please fill all the fields");
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-[calc(100vh_-_64px)]  lg:h-[calc(100vh_-_80px)] flex flex-col items-center justify-center gap-4">
      <div className="w-[90%] md:w-[75%] h-11 ">
        <AnimatePresence>
          {item.alert && (
            <motion.p
              key="alert"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`w-full h-full flex items-center justify-center rounded-lg text-center  ${
                item.alert ? alertColor[item.alert] : ""
              }`}
            >
              {item.alertMessage || "Alert Message"}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        <div className="w-full p-2 border-b border-gray-300 flex gap-4 items-center justify-center">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            type="text"
            required
            name="title"
            value={item.title}
            onChange={handleOnChange}
            placeholder="Give me a title..."
            className="w-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor "
          />
        </div>
        <div className="w-full">
          <select
            name="category"
            id="category"
            onChange={handleOnChange}
            value={item.category}
            className="w-full outline-none text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option key="other" value="other" disabled>
              Select a category
            </option>
            {categoriesData.map((category) => (
              <option
                key={category.name}
                value={category.urlParamName}
                className="text-base border-0 outline-none capitalize bg-white text-headingColor"
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div
          className="group flex flex-col justify-center items-center
          border-2 border-dotted border-gray-300
          w-full h-[225px] md:h-[350px] cursor-pointer rounded-lg"
        >
          {loading ? (
            <Loader />
          ) : (
            <>
              {item.imageAsset ? (
                <>
                  <div className="relative h-full">
                    <img
                      src={item.imageAsset}
                      alt="Uploaded"
                      className="w-full h-full object-cover"
                    />
                    <button
                      className="absolute bottom-3 right-3 p-3 rounded-full
                  bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md
                  "
                      onClick={handleDeleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <label
                    className="w-full h-full flex flex-col
                  items-center justify-center cursor-pointer"
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      onChange={handleUploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full p-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-xl text-gray-700" />
            <input
              id="calories"
              type="number"
              inputMode="numeric"
              required
              name="calories"
              value={item.calories || ""}
              onChange={handleOnChange}
              placeholder="Calories"
              className="w-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor "
            />
          </div>
          <div className="w-full p-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-xl text-gray-700" />
            <input
              type="number"
              inputMode="numeric"
              required
              name="price"
              value={item.price || ""}
              onChange={handleOnChange}
              placeholder="Price"
              className="w-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor "
            />
          </div>
        </div>
        <div className="w-full flex ">
          <button
            onClick={handleSubmit}
            className="w-full md:w-auto ml-0 md:ml-auto px-12 py-2 bg-emerald-500 text-lg text-white font-semibold
            border-none outline-none rounded-lg "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
