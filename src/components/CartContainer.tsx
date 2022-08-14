import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import Iceream from "../assets/img/i1.png";
import { useAppDispatch } from "../app/hooks";
import { toggleShow } from "../features/showCartSlice";
import { useIsSmall } from "../utils/useMediaQuery";
function CartContainer() {
  const dispatch = useAppDispatch();
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="initial"
      variants={
        useIsSmall()
          ? {
              initial: { opacity: 0, x: "-500px" },
              animate: { opacity: 1, x: "0px" },
            }
          : {
              initial: { opacity: 0, x: "400px" },
              animate: { opacity: 1, x: 0 },
            }
      }
      className="fixed z-50 top-0 right-0 w-full md:w-[375px] h-screen bg-white drop-shadow-md flex flex-col"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div
          onClick={() => dispatch(toggleShow())}
          whileTap={{ scale: 0.75 }}
        >
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl " />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor"
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>
      {/* Bottom Section */}
      <div className="w-full h-full rounded-t-[2rem] flex flex-col bg-cartBg">
        {/* Cart Items Container */}
        <div className="w-full h-[340px] md:h-[375px] px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
          {/* Cart Item */}
          <div className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2">
            <img
              src={Iceream}
              alt=""
              className="w-20 h-20 max-w-[60px] rounded-full object-contain"
            />
            <div className="flex flex-col gap-2">
              <p className="text-base text-gray-50">Chocolate Vanilla</p>
              <p className="text-sm text-gray-300 font-semibold">$5.5</p>
            </div>
            <div className="group flex items-center gap-2 ml-auto cursor-pointer">
              <motion.div whileTap={{ scale: 0.6 }}>
                <BiMinus className="text-gray-50" />
              </motion.div>
              <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
                1
              </p>
              <motion.div whileTap={{ scale: 0.6 }}>
                <BiPlus className="text-gray-50" />
              </motion.div>
            </div>
          </div>
        </div>
        {/* Total */}
        <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
          <div className="w-full flex items-center justify-between">
            <p className="text-gray-400 text-lg">Sub Total</p>
            <p className="text-gray-400 text-lg">$ 3.5</p>
          </div>
          <div className="w-full flex items-center justify-between">
            <p className="text-gray-400 text-lg">Delivery</p>
            <p className="text-gray-400 text-lg">$ 1.5</p>
          </div>
          <div className="w-full border-b border-gray-600 my-2"></div>
          <div className="w-full flex items-center justify-between">
            <p className="text-gray-200 text-xl font-semibold">Total</p>
            <p className="text-gray-200 text-xl font-semibold">$ 5.0</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
          >
            Check Out
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default CartContainer;
