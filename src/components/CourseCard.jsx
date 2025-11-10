import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Clock, Users } from "lucide-react";

const CourseCard = ({ course }) => {
  return (
    <motion.div
      className="course-card bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            course.imageURL ||
            "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"
          }
          alt={course.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        {course.isFeatured && (
          <span className="absolute top-3 right-3 px-3 py-1 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Category */}
        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full mb-3 w-fit">
          {course.category || "General"}
        </span>

        {/* Title */}
        <h2 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">
          {course.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {course.description || "No description available."}
        </p>

        {/* Instructor Info */}
        {course.instructor && (
          <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-gray-200">
            <img
              src={
                course.instructor.photo ||
                "https://via.placeholder.com/32?text=I"
              }
              alt={course.instructor.name}
              className="w-8 h-8 rounded-full object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/32?text=I";
              }}
            />
            <div>
              <p className="text-xs text-gray-600">Instructor</p>
              <p className="text-sm font-semibold text-gray-800">
                {course.instructor.name || "Unknown"}
              </p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration || "Self-paced"}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{course.enrolledStudents || 0} enrolled</span>
          </div>
        </div>

        {/* Rating + Price */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-1">
            <Star size={16} fill="#facc15" className="text-yellow-400" />
            <span className="text-sm font-semibold text-gray-700">
              {course.rating ? course.rating.toFixed(1) : "New"}
            </span>
          </div>
          <span className="text-2xl font-bold text-green-600">
            ${course.price || "Free"}
          </span>
        </div>

        {/* View Details Button */}
        <Link
          to={`/course/${course._id}`}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors text-center font-semibold"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default CourseCard;