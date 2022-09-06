import { Link } from "react-router-dom";
import { MdShoppingBasket, MdLogout, MdAdd, MdLogin } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import logo from "../assets/img/logo.png";
import avatar from "../assets/img/avatar.png";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setUserNull } from "../features/userSlice";
import { useState, useRef, useEffect } from "react";
import { toggleShow } from "../features/showCartSlice";
import { setCartEmpty } from "../features/cartItemsSlice";
import { logOut, signInWithGoogle } from "../utils/auth";

const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  const { user, cartItems } = useAppSelector((state) => ({
    user: state.userState.user,
    cartItems: state.cartItems.cartItems,
  }));

  const appDispatch = useAppDispatch();

  let menuRef = useRef<HTMLDivElement>(null);
  let menuRef2 = useRef<HTMLDivElement>(null);

  // Close menu when click outside of it using mouseDown event and ref
  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        menuRef2.current &&
        !menuRef2.current.contains(event.target as Node)
      ) {
        setIsMenu(false);
      }
    };
    document.addEventListener("mousedown", closeMenu);
    return () => {
      document.removeEventListener("mousedown", closeMenu);
    };
  }, []);

  const handleMenu = () => {
    setIsMenu(!isMenu);
  };
  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogout = async () => {
    try {
      await logOut();
      localStorage.clear();
      appDispatch(setUserNull());
      appDispatch(setCartEmpty());
    } catch (err) {
      console.log("Error while logging out", err);
    }
  };

  return (
    <header className="fixed z-40 top-0 left-0 bg-primary w-screen px-5 py-3 md:px-16 md:py-5">
      {/* Desktop and tablet */}
      <div className="hidden md:flex w-full h-full">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-8 object-cover" src={logo} alt="logo" />
          <p className="text-xl font-bold text-headingColor">PetPuja</p>
        </Link>
        <ul className="flex ml-auto items-center gap-8">
          <li
            key={"home"}
            className="text-base text-textColor hover:text-headingColor duration-100 cursor-pointer "
          >
            Home
          </li>
          <li
            key={"menu"}
            className="text-base text-textColor hover:text-headingColor duration-100 cursor-pointer "
          >
            Menu
          </li>
          <li
            key={"about"}
            className="text-base text-textColor hover:text-headingColor duration-100 cursor-pointer "
          >
            About Us
          </li>
          <li
            key={"service"}
            className="text-base text-textColor hover:text-headingColor duration-100 cursor-pointer "
          >
            Service
          </li>

          <li key={"basket"} onClick={() => appDispatch(toggleShow())}>
            <div className="flex relative">
              <MdShoppingBasket className="text-xl text-textColor hover:text-headingColor duration-100 cursor-pointer" />
              {cartItems.length > 0 && (
                <p className="absolute -top-3 -right-3  flex items-center justify-center bg-cartNumBg w-5 h-5 rounded-full text-white text-xs font-semibold">
                  {cartItems.length}
                </p>
              )}
            </div>
          </li>
          <li key={"profile"}>
            {/* Menu Ref here */}
            <div ref={menuRef} className="relative">
              <div onClick={user ? handleMenu : handleLogin}>
                <motion.img
                  whileTap={{ scale: 0.6 }}
                  className="w-10 rounded-full min-w-[40px] min-h-[40px] shadow-lg"
                  src={user && user.photoURL ? user?.photoURL : avatar}
                  alt="avatar"
                />
              </div>

              <AnimatePresence>
                {isMenu && (
                  <motion.div
                    key="modal"
                    initial={{ opacity: 0, scale: 0.6, x: "40px" }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      scale: 0,
                      x: "40px",
                      y: "-20px",
                    }}
                    className="w-40 bg-gray-50 absolute top-12 right-0 shadow-xl rounded-lg"
                    onClick={handleMenu}
                  >
                    <Link to={"/createItem"}>
                      <p className="text-base text-textColor px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100  ">
                        New Item <MdAdd />
                      </p>
                    </Link>

                    <p
                      className="text-base text-textColor px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100  "
                      onClick={handleLogout}
                    >
                      Logout <MdLogout />
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </li>
        </ul>
      </div>
      {/* Mobile */}
      <div className="md:hidden flex items-center justify-between w-full h-full ">
        <div
          className="flex relative"
          onClick={() => appDispatch(toggleShow())}
        >
          <MdShoppingBasket className="text-xl text-textColor hover:text-headingColor duration-100 cursor-pointer" />
          {cartItems.length > 0 && (
            <p className="absolute -top-3 -right-3 flex items-center justify-center bg-cartNumBg w-5 h-5 rounded-full text-white text-xs font-semibold">
              {cartItems.length}
            </p>
          )}
        </div>

        <Link to="/" className="flex items-center gap-2">
          <img className="w-8 object-cover" src={logo} alt="logo" />
          <p className="text-xl font-bold text-headingColor">PetPuja</p>
        </Link>
        {/* Right menu */}
        <div ref={menuRef2} className="relative">
          <div onClick={handleMenu}>
            <motion.img
              whileTap={{ scale: 0.6 }}
              className="w-10 rounded-full min-w-[40px] min-h-[40px] shadow-lg"
              src={user && user.photoURL ? user.photoURL : avatar}
              alt="avatar"
            />
          </div>
          <AnimatePresence>
            {isMenu && (
              <motion.div
                onClick={handleMenu}
                key="modal"
                initial={{ opacity: 0, scale: 0.6, x: "40px" }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0,
                  x: "40px",
                  y: "-20px",
                }}
                className="w-40 bg-gray-50 flex flex-col absolute top-12 right-0 shadow-xl rounded-lg"
              >
                {user && (
                  <Link to={"/createItem"}>
                    <p className="text-base text-textColor px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100  ">
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}
                <li
                  key={"home"}
                  className="text-base text-textColor px-4 py-2 cursor-pointer hover:bg-slate-100 list-none "
                >
                  Home
                </li>
                <li
                  key={"menu"}
                  className="text-base text-textColor px-4 py-2 cursor-pointer hover:bg-slate-100 list-none "
                >
                  Menu
                </li>
                <li
                  key={"about"}
                  className="text-base text-textColor px-4 py-2 cursor-pointer hover:bg-slate-100 list-none "
                >
                  About Us
                </li>
                <li
                  key={"service"}
                  className="text-base text-textColor px-4 py-2 cursor-pointer hover:bg-slate-100 list-none "
                >
                  Service
                </li>

                {user ? (
                  <p
                    className="text-base text-textColor m-2 p-2 shadow-md flex items-center justify-center gap-3 cursor-pointer bg-gray-200 hover:bg-gray-300  "
                    onClick={handleLogout}
                  >
                    Logout <MdLogout />
                  </p>
                ) : (
                  <p
                    className="text-base text-orange-600 font-semibold m-2 p-2 shadow-md flex items-center justify-center gap-3 cursor-pointer bg-orange-100 hover:bg-orange-200  "
                    onClick={handleLogin}
                  >
                    Login <MdLogin />
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
