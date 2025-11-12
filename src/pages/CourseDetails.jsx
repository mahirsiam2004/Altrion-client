import React, { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Clock, Users, Award, BookOpen, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const CourseDetails = () => {
  const course = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEnroll = async () => {
    if (!user) {
      toast.error("Please login to enroll in this course");
      navigate("/signin");
      return;
    }

    try {
      const enrollment = {
        courseId: course._id,
        userEmail: user.email,
        userName: user.displayName,
        courseTitle: course.title,
      };

      const response = await fetch("https://altrion-server.vercel.app/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enrollment),
      });

      const data = await response.json();

      if (response.status === 400) {
        toast.info("You are already enrolled in this course!");
        return;
      }

      if (!response.ok) {
        throw new Error("Enrollment failed");
      }

      toast.success("Successfully enrolled in the course! 🎉");
    } catch (error) {
      console.error("Enrollment error:", error);
      toast.error("Failed to enroll. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image */}
            <div className="h-96 lg:h-auto">
              <img
                src={course.imageURL}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Course Info */}
            <div className="p-8">
              {/* Category Badge */}
              <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 text-sm font-bold rounded-full mb-4">
                {course.category}
              </span>

              {/* Title */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>

              {/* Rating & Students */}
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Star size={20} fill="#facc15" className="text-yellow-400" />
                  <span className="text-lg font-semibold">
                    {course.rating ? course.rating.toFixed(1) : "New"}
                  </span>
                  <span className="text-gray-600">
                    ({course.enrolledStudents || 0} reviews)
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users size={20} />
                  <span>{course.enrolledStudents || 0} students enrolled</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-green-600">
                  ${course.price}
                </span>
              </div>

              {/* Enroll Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnroll}
                className="w-full bg-indigo-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
              >
                <BookOpen className="w-6 h-6" />
                <span>Enroll Now</span>
              </motion.button>

              {/* Instructor Info */}
              {course.instructor && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Instructor</p>
                  <div className="flex items-center space-x-3">
                    <img
                      src={
                        course.instructor.photo ||
                        "https://via.placeholder.com/48"
                      }
                      alt={course.instructor.name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/48";
                      }}
                    />
                    <div>
                      <p className="font-semibold text-gray-900">
                        {course.instructor.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {course.instructor.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Course Details */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About This Course
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {course.description}
              </p>
            </motion.div>

            {/* What You'll Learn */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-md p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                What You'll Learn
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Master the fundamentals",
                  "Build real-world projects",
                  "Get certified",
                  "Lifetime access to materials",
                  "Learn from industry experts",
                  "Join a community of learners",
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Course Features
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold text-gray-900">
                      {course.duration}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-6 h-6 text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-600">Certificate</p>
                    <p className="font-semibold text-gray-900">Included</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-6 h-6 text-indigo-600" />
                  <div>
                    <p className="text-sm text-gray-600">Access</p>
                    <p className="font-semibold text-gray-900">Lifetime</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Share Course */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Share This Course
              </h3>
              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Facebook
                </button>
                <button className="flex-1 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                  Twitter
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
