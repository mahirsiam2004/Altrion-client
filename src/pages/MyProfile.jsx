import React, { useContext, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  BookOpen, 
  GraduationCap,
  Edit,
  Camera
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export const MyProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    coursesCreated: 0,
    coursesEnrolled: 0,
    totalStudents: 0,
  });

  const [formData, setFormData] = useState({
    name: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });

  useEffect(() => {
    if (user?.email) {
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      // Fetch created courses
      const createdRes = await fetch(
        `http://localhost:3000/courses/instructor/${user.email}`
      );
      const createdData = await createdRes.json();

      // Fetch enrolled courses
      const enrolledRes = await fetch(
        `http://localhost:3000/enrollments/${user.email}`
      );
      const enrolledData = await enrolledRes.json();

      // Calculate total students
      const totalStudents = createdData.reduce(
        (sum, course) => sum + (course.enrolledStudents || 0),
        0
      );

      setStats({
        coursesCreated: createdData.length,
        coursesEnrolled: enrolledData.length,
        totalStudents: totalStudents,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUserProfile(formData.name, formData.photoURL);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const joinDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Recently";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8"
        >
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

          <div className="px-8 pb-8">
            {/* Profile Picture */}
            <div className="relative -mt-16 mb-4">
              <div className="relative inline-block">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl object-cover"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/128";
                    }}
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-xl bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <User className="w-16 h-16 text-indigo-600 dark:text-indigo-400" />
                  </div>
                )}
                
                {isEditing && (
                  <button className="absolute bottom-2 right-2 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white hover:bg-indigo-700 shadow-lg">
                    <Camera className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Profile Info */}
            {!isEditing ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {user?.displayName || "User"}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 flex items-center space-x-2 mt-1">
                      <Mail className="w-4 h-4" />
                      <span>{user?.email}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {joinDate}</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Photo URL
                  </label>
                  <input
                    type="url"
                    name="photoURL"
                    value={formData.photoURL}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            {
              icon: <BookOpen className="w-8 h-8" />,
              title: "Courses Created",
              value: stats.coursesCreated,
              color: "from-blue-500 to-indigo-600",
              bgColor: "bg-blue-50 dark:bg-blue-900/20",
            },
            {
              icon: <GraduationCap className="w-8 h-8" />,
              title: "Courses Enrolled",
              value: stats.coursesEnrolled,
              color: "from-purple-500 to-pink-600",
              bgColor: "bg-purple-50 dark:bg-purple-900/20",
            },
            {
              icon: <Award className="w-8 h-8" />,
              title: "Total Students",
              value: stats.totalStudents,
              color: "from-orange-500 to-red-600",
              bgColor: "bg-orange-50 dark:bg-orange-900/20",
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`${stat.bgColor} rounded-xl p-6 shadow-lg`}
            >
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-lg`}
              >
                {stat.icon}
              </div>
              <h3 className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-1">
                {stat.title}
              </h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Account Information
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">Email</span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {user?.email}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">
                Email Verified
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  user?.emailVerified
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {user?.emailVerified ? "Verified" : "Not Verified"}
              </span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-400">
                Member Since
              </span>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                {joinDate}
              </span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-gray-600 dark:text-gray-400">User ID</span>
              <span className="font-mono text-sm text-gray-900 dark:text-gray-100">
                {user?.uid?.slice(0, 12)}...
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};