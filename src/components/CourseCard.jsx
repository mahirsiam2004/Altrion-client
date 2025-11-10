import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const CourseCard = ({ course }) => {
    console.log(course);
  return (
    <motion.div
      className="course-card bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={course.imageURL || "https://via.placeholder.com/400x250?text=Course+Image"}
          alt={course.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          {course.title}
        </h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {course.description || "No description available."}
        </p>

        {/* Rating + Price */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill={i < 4 ? "#facc15" : "none"} />
            ))}
          </div>
          <span className="text-lg font-semibold text-green-600">
            ${course.price || "Free"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
