import { createBrowserRouter } from "react-router-dom";

import { Home } from "../pages/Home";
import { Signin } from "../pages/SignIn";
import { Signup } from "../pages/SignUp";
import { Dashboard } from "../pages/Dashboard";
import { MyProfile } from "../pages/MyProfile";
import { PrivateRoute } from "./PrivateRoute";
import MainLayout from "../layourts/MainLayout";


export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
