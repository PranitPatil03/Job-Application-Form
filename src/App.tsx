import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./page/HomePage";
import FormPage from "./page/FormPage";
import SuccessPage from "./page/SuccessPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "/form",
    element: <FormPage></FormPage>,
  },
  {
    path: "/registered",
    element: <SuccessPage></SuccessPage>,
  },
]);

function App() {
  return (
    <>
      <div className="">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
