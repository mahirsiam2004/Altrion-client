import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import CourseCard from "../components/CourseCard";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const MyEnrolledCourses = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetchEnrolledCourses();
    }
  }, [user]);

  const fetchEnrolledCourses = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/enrollments/${user.email}`
      );
      const data = await response.json();
      setCourses(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      toast.error("Failed to load your enrolled courses");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Enrolled Courses
          </h1>
          <p className="text-gray-600">
            Continue your learning journey
          </p>
        </div>

        {/* Courses */}
        {courses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-md p-12 text-center"
          >
            <div className="text-6xl mb-4">🎓</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              No enrolled courses yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start learning by enrolling in a course today
            </p>
            <a
              href="/courses"
              className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
            >
              Browse Courses
            </a>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEnrolledCourses;