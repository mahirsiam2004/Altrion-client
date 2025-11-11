import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  Plus,
  GraduationCap,
  TrendingUp,
  Users,
  Award,
  BarChart3,
  Clock,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    myCourses: 0,
    enrolledCourses: 0,
    totalStudents: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchDashboardStats();
    }
  }, [user]);

  const fetchDashboardStats = async () => {
    try {
      // Fetch instructor's courses
      const coursesRes = await fetch(
        `http://localhost:3000/courses/instructor/${user.email}`
      );
      const coursesData = await coursesRes.json();

      // Fetch enrolled courses
      const enrolledRes = await fetch(
        `http://localhost:3000/enrollments/${user.email}`
      );
      const enrolledData = await enrolledRes.json();

      // Calculate total students
      const totalStudents = coursesData.reduce(
        (sum, course) => sum + (course.enrolledStudents || 0),
        0
      );

      setStats({
        myCourses: coursesData.length,
        enrolledCourses: enrolledData.length,
        totalStudents: totalStudents,
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      setLoading(false);
    }
  };

  const quickLinks = [
    {
      title: "Add New Course",
      description: "Create and share a new course",
      icon: <Plus className="w-8 h-8" />,
      link: "/add-course",
      color: "from-green-400 to-emerald-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "My Courses",
      description: "Manage courses you created",
      icon: <BookOpen className="w-8 h-8" />,
      link: "/my-courses",
      color: "from-blue-400 to-indigo-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "My Enrolled Courses",
      description: "Continue your learning journey",
      icon: <GraduationCap className="w-8 h-8" />,
      link: "/my-enrolled-courses",
      color: "from-purple-400 to-pink-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "All Courses",
      description: "Browse all available courses",
      icon: <BarChart3 className="w-8 h-8" />,
      link: "/courses",
      color: "from-orange-400 to-red-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-4 mb-6">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-20 h-20 rounded-full border-4 border-indigo-500 shadow-lg"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/80";
                }}
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center border-4 border-indigo-500">
                <Users className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                Welcome back, {user?.displayName || "User"}! 👋
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                Here's what's happening with your courses today
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "My Courses",
              value: loading ? "..." : stats.myCourses,
              icon: <BookOpen className="w-8 h-8" />,
              color: "from-blue-500 to-indigo-600",
              bgColor: "bg-blue-50 dark:bg-blue-900/20",
            },
            {
              title: "Enrolled Courses",
              value: loading ? "..." : stats.enrolledCourses,
              icon: <GraduationCap className="w-8 h-8" />,
              color: "from-purple-500 to-pink-600",
              bgColor: "bg-purple-50 dark:bg-purple-900/20",
            },
            {
              title: "Total Students",
              value: loading ? "..." : stats.totalStudents,
              icon: <Users className="w-8 h-8" />,
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

        {/* Quick Links */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={link.link}
                  className={`block ${link.bgColor} dark:bg-gray-500 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all group`}
                >
                  <div
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    {link.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {link.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {link.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Note about Update Course */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg"
          >
            <p className="text-sm text-blue-800 dark:text-blue-500">
              💡 <strong>Tip:</strong> To update a course, go to "My Courses"
              and click the "Update" button on any course card.
            </p>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Recent Activity
            </h2>
            <Clock className="w-6 h-6 text-gray-400" />
          </div>

          <div className="space-y-4">
            {[
              {
                icon: <Award className="w-5 h-5 text-yellow-500" />,
                text: "You've reached 100+ students milestone! 🎉",
                time: "2 hours ago",
              },
              {
                icon: <BookOpen className="w-5 h-5 text-blue-500" />,
                text: "New student enrolled in 'Web Development Bootcamp'",
                time: "5 hours ago",
              },
              {
                icon: <GraduationCap className="w-5 h-5 text-purple-500" />,
                text: "You completed 'Data Science Pro' course",
                time: "1 day ago",
              },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-gray-100 font-medium">
                    {activity.text}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-2xl"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              💡
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Pro Tip</h3>
              <p className="text-indigo-100 text-lg">
                Engage with your students regularly to improve course ratings
                and build a loyal learning community!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
