import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Loader from "./components/loader/Loader";
import { makeGetRequest } from "./apis/makeGetRequest";
import Onboard from "./pages/onboard/Onboard";
import Login from "./pages/onboard/Login";
import Register from "./pages/onboard/Register";
import Share from "./pages/share/Share";
import DashBoard from "./pages/dashboard/DashBoard";
import Board from "./pages/dashboard/board/Board";
import Settings from "./pages/dashboard/settingsPage/Settings";
import Analytics from "./pages/dashboard/analytics/Analytics";
import { backendUrl } from "./utils/constants";
import { setUser } from "./store/userSlice";
import { Toaster } from "react-hot-toast";

const Body = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.data);

  async function auth() {
    const data = await makeGetRequest(`${backendUrl}/api/v1/user/auth`);
    setLoading(false);
    if (data.sucess) {
      dispatch(setUser(data.data));
    }
  }

  useEffect(() => {
    if (localStorage.getItem("acess_token") !== null) {
      auth();
    } else {
      setLoading(false);
    }
  }, []);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: user ? <Navigate to={"/dashboard"} /> : <Onboard />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/share/:taskId",
      element: <Share />,
    },
    {
      path: "/",
      element: user ? <DashBoard /> : <Navigate to={"/login"} />,
      children: [
        {
          path: "/dashboard",
          element: <Board />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "/analytics",
          element: <Analytics />,
        },
      ],
    },
  ]);

  if (loading) {
    return (
      <div className="screen">
        <Loader size={"1.5rem"} color={"#17A2B8"} />
      </div>
    );
  }

  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            padding: "1rem 1.5rem",
            fontWeight: "600",
          },
        }}
      />
    </>
  );
};

export default Body;
