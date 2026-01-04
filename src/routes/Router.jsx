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
import About from "../pages/About";
import Contact from "../pages/Contact";
import Blog from "../pages/Blog";
import Help from "../pages/Help";
import Privacy from "../pages/Privacy";
import Terms from "../pages/Terms";
import AdminDashboard from "../pages/AdminDashboard";
import AdminCourses from "../pages/AdminCourses";
import AdminUsers from "../pages/AdminUsers";
import { AdminRoute } from "./AdminRoute";

import { coursesAPI } from "../services/api";
import MainLayout from "../layourts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

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
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/privacy",
        element: <Privacy />,
      },
      {
        path: "/terms",
        element: <Terms />,
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
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "add-course",
            element: <AddCourse />,
          },
          {
            path: "my-courses",
            element: <MyCourses />,
          },
          {
            path: "my-enrolled-courses",
            element: <MyEnrolledCourses />,
          },
          {
            path: "update-course/:id",
            element: <UpdateCourse />,
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
            path: "profile",
            element: <MyProfile />,
          },
          {
            path: "admin",
            element: (
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            ),
          },
          {
            path: "admin/courses",
            element: (
              <AdminRoute>
                <AdminCourses />
              </AdminRoute>
            ),
          },
          {
            path: "admin/users",
            element: (
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            ),
          },
        ],
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