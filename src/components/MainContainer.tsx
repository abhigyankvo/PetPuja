import HomeContainer from "./HomeContainer";
import { AnimatePresence, motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { MenuContainer, RowContainer, CartContainer } from ".";
import { useAppSelector } from "../app/hooks";
import { useState } from "react";
const MainContainer = () => {
  const { foodItems, showCart } = useAppSelector((state) => ({
    foodItems: state.foodItems.foodItems,
    showCart: state.showCart.show,
  }));
  const [scrollValue, setScrollValue] = useState(0);
  return (
    <div className="w-full h-auto flex flex-col justify-center items-center relative">
      <HomeContainer />
      <section className="w-full my-6">
        <div className="w-full flex items-center justify-between">
          <p
            className="text-2xl font-semibold capitalize text-headingColor 
          relative before:absolute before:rounded-lg
          before:content before:w-32 before:h-1 before:-bottom-2
          before:left-0 before:bg-gradient-to-r from-orange-300 to-orange-600
          "
          >
            Our fresh & healthy fruits
          </p>
          <div className="hidden md:flex gap-3 items-center">
            <div onClick={() => setScrollValue(-200)}>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer  hover:shadow-lg flex items-center justify-center"
              >
                <MdChevronLeft className="text-lg text-white" />
              </motion.div>
            </div>
            <div onClick={() => setScrollValue(200)}>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer  hover:shadow-lg flex items-center justify-center"
              >
                <MdChevronRight className="text-lg text-white" />
              </motion.div>
            </div>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={true}
          data={foodItems.filter((item) => item.category === "fruits")}
        />
      </section>
      <MenuContainer />
      <AnimatePresence>{showCart && <CartContainer />}</AnimatePresence>
    </div>
  );
};

export default MainContainer;
