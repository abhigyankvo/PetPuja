import { Route, Routes } from "react-router-dom";
import { CreateContainer, Header, MainContainer } from "./components";
import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { getFoodItems } from "./features/foodItemsSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";
import { setUser } from "./features/userSlice";
import { IUser } from "./types/interfaces";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFoodItems());
  }, [dispatch]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const user = currentUser?.providerData[0] as IUser;
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(setUser(user));
      }
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <div className="w-screen h-auto bg-primary">
      <Header />
      <main className="mt-16 md:mt-20 px-5 py-2 md:py-3 md:px-16 w-full">
        <Routes>
          <Route path="/" element={<MainContainer />} />
          <Route path="/createItem" element={<CreateContainer />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
