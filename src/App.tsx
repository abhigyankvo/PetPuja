import { Route, Routes } from "react-router-dom";
import { CreateContainer, Header, MainContainer } from "./components";
import { useEffect } from "react";
import { useAppDispatch } from "./app/hooks";
import { getFoodItems } from "./features/foodItemsSlice";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getFoodItems());
  }, []);

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
