// src/routes/Router.jsx
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import { Signin } from "../pages/Signin";
import { Signup } from "../pages/Signup";
import { Dashboard } from "../pages/Dashboard";
import MyProfile from "../pages/MyProfile";
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
import AdminDashboard from "../pages/AdminDashboard";
import AdminCourses from "../pages/AdminCourses";
import AdminUsers from "../pages/AdminUsers";
import DashboardLayout from "../layouts/DashboardLayout";

import { coursesAPI } from "../services/api";
import MainLayout from "../layourts/MainLayout";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/signin", element: <Signin /> },
      { path: "/signup", element: <Signup /> },
      { path: "/courses", element: <AllCourses />, loader: async () => { try { const data = await coursesAPI.getAllCourses(); return Array.isArray(data) ? data : []; } catch (e) { console.error("Error loading courses:", e); return []; } } },
      { path: "/course/:id", element: <PrivateRoute><CourseDetails /></PrivateRoute>, loader: async ({ params }) => { try { return await coursesAPI.getCourseById(params.id); } catch (e) { console.error("Error loading course:", e); throw new Response("Course not found", { status: 404 }); } } },
      { path: "/add-course", element: <PrivateRoute><AddCourse /></PrivateRoute> },
      { path: "/my-courses", element: <PrivateRoute><MyCourses /></PrivateRoute> },
      { path: "/my-enrolled-courses", element: <PrivateRoute><MyEnrolledCourses /></PrivateRoute> },
      { path: "/update-course/:id", element: <PrivateRoute><UpdateCourse /></PrivateRoute>, loader: async ({ params }) => { try { return await coursesAPI.getCourseById(params.id); } catch (e) { console.error("Error loading course:", e); throw new Response("Course not found", { status: 404 }); } } },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/blog", element: <Blog /> },
      { path: "/help", element: <Help /> },
      {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "profile", element: <MyProfile /> },
          { path: "my-courses", element: <MyCourses /> },
          { path: "my-enrolled-courses", element: <MyEnrolledCourses /> },
          { path: "add-course", element: <AddCourse /> },
          { path: "update-course/:id", element: <UpdateCourse /> },
          { path: "admin", element: <AdminDashboard /> },
          { path: "admin/courses", element: <AdminCourses /> },
          { path: "admin/users", element: <AdminUsers /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
