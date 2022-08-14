import React, { useEffect, useRef } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { IFoodItem } from "../types/interfaces";
import NotFound from "../assets/img/NotFound.svg";
interface IProps {
  flag: boolean;
  data: IFoodItem[];
  scrollValue?: number;
}
function RowContainer({ flag, data, scrollValue = 0 }: IProps) {
  const rowContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (rowContainerRef.current) {
      rowContainerRef.current.scrollLeft += scrollValue;
    }
  }, [scrollValue]);
  return (
    <div
      ref={rowContainerRef}
      className={`w-full flex items-center gap-3 my-12 scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data.length > 0 ? (
        data.map((item) => (
          <div
            key={item.id}
            className="w-[275px] min-w-[275px] md:w-[300] md:min-w-[300] h-[200px] 
            bg-cardOverlay rounded-lg p-2 my-5 md:my-12  backdrop-blur-lg hover:drop-shadow-lg
            flex flex-col items-center justify-between"
          >
            <div className="w-full flex items-center justify-between ">
              <motion.div
                className="w-40 h-40 -mt-12 drop-shadow-2xl"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={item?.imageUrl}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </motion.div>

              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md"
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>
            <div className="w-full flex flex-col items-end justify-end ">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span> {item.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} className="h-96" alt="Items not found" />
          <p className="text-xl text-headingColor font-semibold my-3">
            Items not found
          </p>
        </div>
      )}
    </div>
  );
}

export default RowContainer;
