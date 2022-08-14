import { useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categoriesData } from "../utils/data";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useAppSelector } from "../app/hooks";
function MenuContainer() {
  const [filter, setFilter] = useState("chicken");
  const { foodItems } = useAppSelector((state) => state.foodItems);
  return (
    <section id="menu" className="w-full my-6">
      <div className="w-full flex flex-col items-center justify-center">
        <p
          className="text-2xl font-semibold capitalize text-headingColor 
          relative before:absolute before:rounded-lg
          before:content before:w-16 before:h-1 before:-bottom-2
          before:left-0 before:bg-gradient-to-r from-orange-300 to-orange-600
          mr-auto
          "
        >
          Our hot dishes
        </p>
        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categoriesData.map((item) => (
            <div key={item.name} onClick={() => setFilter(item.urlParamName)}>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className={`group ${
                  filter === item.urlParamName ? "bg-cartNumBg" : "bg-white"
                } w-24 h-28 min-w-[94px] cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg `}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === item.urlParamName ? "bg-white" : "bg-cartNumBg"
                  } group-hover:bg-white flex items-center justify-center`}
                >
                  <IoFastFood
                    className={`${
                      filter === item.urlParamName
                        ? "text-textColor"
                        : "text-white"
                    } group-hover:text-textColor text-lg`}
                  />
                </div>
                <p
                  className={`${
                    filter === item.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } text-sm  group-hover:text-white`}
                >
                  {item.name}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full">
        <RowContainer
          flag={false}
          data={foodItems.filter((item) => item.category === filter)}
        />
      </div>
    </section>
  );
}

export default MenuContainer;
