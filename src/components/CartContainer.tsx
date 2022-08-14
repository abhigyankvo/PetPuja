import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { toggleShow } from "../features/showCartSlice";
import { useIsSmall } from "../utils/useMediaQuery";
import EmptyCart from "../assets/img/emptyCart.svg";
import {
  decreaseItemQuantity,
  increaseItemQuantity,
  setCartEmpty,
} from "../features/cartItemsSlice";
import { useEffect, useState } from "react";
function CartContainer() {
  const [total, setTotal] = useState(0);
  const dispatch = useAppDispatch();
  const { cartItems, user } = useAppSelector((state) => ({
    cartItems: state.cartItems.cartItems,
    user: state.userState.user,
  }));
  useEffect(() => {
    let totalPrice = cartItems.reduce((acc, item) => {
      return acc + item.qty * item.price;
    }, 0);
    setTotal(totalPrice);
  }, [cartItems]);
  const clearCart = () => {
    localStorage.removeItem("cart");
    dispatch(setCartEmpty());
  };
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
        <div onClick={() => dispatch(toggleShow())}>
          <motion.div whileTap={{ scale: 0.75 }}>
            <MdOutlineKeyboardBackspace className="text-textColor text-3xl " />
          </motion.div>
        </div>
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <div onClick={clearCart}>
          <motion.p
            whileTap={{ scale: 0.75 }}
            className="flex items-center gap-2 p-1 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor"
          >
            Clear <RiRefreshFill />
          </motion.p>
        </div>
      </div>
      {/* Bottom Section */}
      {cartItems.length > 0 ? (
        <div className="w-full h-full rounded-t-[2rem] flex flex-col bg-cartBg">
          {/* Cart Items Container */}
          <div className="w-full h-[60%] md:h-[60%] px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none ">
            {/* Cart Item */}
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2"
              >
                <img
                  src={item.imageUrl}
                  alt=""
                  className="w-20 h-20 max-w-[60px] rounded-full object-contain"
                />
                <div className="flex flex-col gap-2">
                  <p className="text-base text-gray-50">{item.title}</p>
                  <p className="text-sm text-gray-300 font-semibold">
                    {`$ ${item.price * item.qty}`}
                  </p>
                </div>
                <div className="group flex items-center gap-2 ml-auto cursor-pointer">
                  <div onClick={() => dispatch(decreaseItemQuantity(item.id))}>
                    <motion.div whileTap={{ scale: 0.6 }}>
                      <BiMinus className="text-gray-50" />
                    </motion.div>
                  </div>
                  <p className="w-5 h-5 rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
                    {item.qty}
                  </p>
                  <div onClick={() => dispatch(increaseItemQuantity(item.id))}>
                    <motion.div whileTap={{ scale: 0.6 }}>
                      <BiPlus className="text-gray-50" />
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Total */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">$ {total}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$ 2.5</p>
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">
                $ {total + 2.5}
              </p>
            </div>
            {user ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Login to check out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6 ">
          <img src={EmptyCart} alt="Empty Cart" />
          <p className="text-textColor text-xl font-semibold">
            Add some items to cart
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default CartContainer;
