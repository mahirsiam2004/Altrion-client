import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
  DollarSign,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";
import { coursesAPI } from "../services/api";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [allCourses, setAllCourses] = useState([]);
  const [recentCourses, setRecentCourses] = useState([]);

  useEffect(() => {
    document.title = "Admin Dashboard - Altrion";
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);

      // Fetch all courses
      const courses = await coursesAPI.getAllCourses();
      const coursesArray = Array.isArray(courses) ? courses : [];
      
      // Calculate stats
      const totalEnrollments = coursesArray.reduce(
        (sum, course) => sum + (course.enrolledStudents || 0),
        0
      );
      
      const totalRevenue = coursesArray.reduce(
        (sum, course) => sum + ((course.price || 0) * (course.enrolledStudents || 0)),
        0
      );

      setStats({
        totalUsers: 1250, // Mock data - in production, fetch from backend
        totalCourses: coursesArray.length,
        totalEnrollments: totalEnrollments,
        totalRevenue: totalRevenue,
      });

      setAllCourses(coursesArray);
      setRecentCourses(coursesArray.slice(0, 5));

    } catch (error) {
      console.error("Error fetching admin data:", error);
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  // Chart data
  const enrollmentTrend = [
    { month: "Jan", enrollments: 45 },
    { month: "Feb", enrollments: 62 },
    { month: "Mar", enrollments: 58 },
    { month: "Apr", enrollments: 78 },
    { month: "May", enrollments: 85 },
    { month: "Jun", enrollments: 95 },
  ];

  const categoryDistribution = allCourses.reduce((acc, course) => {
    const category = course.category || "Uncategorized";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.entries(categoryDistribution).map(([name, count]) => ({
    name,
    count,
  }));

  const maxEnrollments = Math.max(...enrollmentTrend.map((e) => e.enrollments));
  const maxCategoryCount = Math.max(...categoryData.map((c) => c.count), 1);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage your platform and monitor performance
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Total Users",
              value: loading ? "..." : stats.totalUsers.toLocaleString(),
              icon: <Users className="w-8 h-8" />,
              color: "from-blue-500 to-indigo-600",
              bgColor: "bg-blue-50 dark:bg-blue-900/20",
            },
            {
              title: "Total Courses",
              value: loading ? "..." : stats.totalCourses,
              icon: <BookOpen className="w-8 h-8" />,
              color: "from-purple-500 to-pink-600",
              bgColor: "bg-purple-50 dark:bg-purple-900/20",
            },
            {
              title: "Total Enrollments",
              value: loading ? "..." : stats.totalEnrollments.toLocaleString(),
              icon: <GraduationCap className="w-8 h-8" />,
              color: "from-green-500 to-emerald-600",
              bgColor: "bg-green-50 dark:bg-green-900/20",
            },
            {
              title: "Total Revenue",
              value: loading ? "..." : `$${stats.totalRevenue.toLocaleString()}`,
              icon: <DollarSign className="w-8 h-8" />,
              color: "from-orange-500 to-red-600",
              bgColor: "bg-orange-50 dark:bg-orange-900/20",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`${stat.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all`}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}
                >
                  {stat.icon}
                </div>
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1">
                {stat.title}
              </h3>
              <p className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Enrollment Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-2">
              <BarChart3 className="w-6 h-6" />
              <span>Enrollment Trend</span>
            </h2>
            <div className="space-y-4">
              {enrollmentTrend.map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-16 text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {item.month}
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-8">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-8 rounded-full flex items-center justify-end pr-3"
                        style={{ width: `${(item.enrollments / maxEnrollments) * 100}%` }}
                      >
                        <span className="text-sm font-semibold text-white">
                          {item.enrollments}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Category Distribution Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-2">
              <PieChart className="w-6 h-6" />
              <span>Courses by Category</span>
            </h2>
            <div className="space-y-4">
              {categoryData.length > 0 ? (
                categoryData.map((item, index) => {
                  const percentage = (item.count / maxCategoryCount) * 100;
                  const colors = [
                    "from-blue-500 to-blue-600",
                    "from-purple-500 to-purple-600",
                    "from-pink-500 to-pink-600",
                    "from-green-500 to-green-600",
                    "from-orange-500 to-orange-600",
                    "from-red-500 to-red-600",
                  ];
                  return (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-32 text-sm text-gray-600 dark:text-gray-400 font-medium">
                        {item.name}
                      </div>
                      <div className="flex-1">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-8">
                          <div
                            className={`bg-gradient-to-r ${colors[index % colors.length]} h-8 rounded-full flex items-center justify-end pr-3`}
                            style={{ width: `${percentage}%` }}
                          >
                            <span className="text-sm font-semibold text-white">
                              {item.count}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No category data available
                </p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Recent Courses Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
              <Activity className="w-6 h-6" />
              <span>Recent Courses</span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Course Title
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Instructor
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Students
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Price
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500 dark:text-gray-400">
                      Loading...
                    </td>
                  </tr>
                ) : recentCourses.length > 0 ? (
                  recentCourses.map((course, index) => (
                    <tr
                      key={course._id || index}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <td className="py-4 px-4 text-gray-900 dark:text-gray-100 font-medium">
                        {course.title}
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                        {course.category || "General"}
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                        {course.instructor?.name || course.instructor?.email || "Unknown"}
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                        {course.enrolledStudents || 0}
                      </td>
                      <td className="py-4 px-4 text-gray-600 dark:text-gray-400">
                        ${course.price || "Free"}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            course.isFeatured
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                              : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          }`}
                        >
                          {course.isFeatured ? "Featured" : "Active"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No courses found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;

