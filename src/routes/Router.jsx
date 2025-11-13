// src/routes/Router.jsx
import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { Signin } from "../pages/Signin";
import { Signup } from "../pages/Signup";
import { Dashboard } from "../pages/Dashboard";
import { MyProfile } from "../pages/MyProfile";
import { PrivateRoute } from "./PrivateRoute";
import AllCourses from "../pages/AllCourses";
import CourseDetails from "../pages/CourseDetails";
import AddCourse from "../pages/AddCourse";
import MyCourses from "../pages/MyCourses";
import MyEnrolledCourses from "../pages/MyEnrolledCourses";
import UpdateCourse from "../pages/UpdateCourse";
import NotFound from "../pages/NotFound";

import { coursesAPI } from "../services/api";
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
        path: "/courses",
        element: <AllCourses />,
        loader: async () => {
          try {
            const data = await coursesAPI.getAllCourses();
            return Array.isArray(data) ? data : [];
          } catch (error) {
            console.error('Error loading courses:', error);
            return []; 
          }
        },
      },
      {
        path: "/course/:id",
        element: (
          <PrivateRoute>
            <CourseDetails />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          try {
            return await coursesAPI.getCourseById(params.id);
          } catch (error) {
            console.error('Error loading course:', error);
            throw new Response("Course not found", { status: 404 });
          }
        },
      },
      {
        path: "/add-course",
        element: (
          <PrivateRoute>
            <AddCourse />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-courses",
        element: (
          <PrivateRoute>
            <MyCourses />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-enrolled-courses",
        element: (
          <PrivateRoute>
            <MyEnrolledCourses />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-course/:id",
        element: (
          <PrivateRoute>
            <UpdateCourse />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          try {
            return await coursesAPI.getCourseById(params.id);
          } catch (error) {
            console.error('Error loading course:', error);
            throw new Response("Course not found", { status: 404 });
          }
        },
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
  {
    path: "*",
    element: <NotFound />,
  },
]);