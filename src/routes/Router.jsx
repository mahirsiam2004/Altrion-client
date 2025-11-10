import { createBrowserRouter } from "react-router-dom";

import { Home } from "../pages/Home";
import { Signin } from "../pages/Signin";
import { Signup } from "../pages/Signup";
import { Dashboard } from "../pages/Dashboard";
import { MyProfile } from "../pages/MyProfile";
import { PrivateRoute } from "./PrivateRoute";
import MainLayout from "../layourts/MainLayout";
import AllCourses from "../pages/AllCourses";


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
        path:"/courses",
        Component:AllCourses,
        loader:()=>fetch("http://localhost:3000/courses")
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
