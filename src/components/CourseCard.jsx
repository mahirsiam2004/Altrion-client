import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Clock, Users, ArrowRight } from "lucide-react";

const CourseCard = ({ course }) => {
  if (!course) return null;

  return (
    <motion.div
      className="sand-card flex flex-col h-full overflow-hidden"
      whileHover={{ y: -8, boxShadow: "var(--shadow-lg)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={course.imageURL || "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          onError={(e) => { e.target.src = "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"; }}
        />
        {course.isFeatured && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-[var(--amber)] text-white text-xs font-bold rounded-full shadow-sm">
            বিশেষ
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="inline-block px-2.5 py-1 bg-[var(--sage-light)] text-[var(--sage)] text-xs font-semibold rounded-full mb-3 w-fit">
          {course.category || "সাধারণ"}
        </span>

        <h2 className="text-lg font-bold mb-2 text-[var(--text-ink)] line-clamp-2 leading-snug">
          {course.title}
        </h2>

        <p className="text-[var(--text-soft)] text-sm mb-4 line-clamp-2 flex-grow leading-relaxed">
          {course.description || "কোনো বিবরণ নেই।"}
        </p>

        {course.instructor && (
          <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-[var(--line)]">
            <img
              src={course.instructor.photo || "https://via.placeholder.com/32?text=I"}
              alt={course.instructor.name}
              className="w-7 h-7 rounded-full object-cover"
              onError={(e) => { e.target.src = "https://via.placeholder.com/32?text=I"; }}
            />
            <div>
              <p className="text-xs text-[var(--text-faint)]">প্রশিক্ষক</p>
              <p className="text-sm font-semibold text-[var(--text-ink)]">
                {course.instructor.name || "অজানা"}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4 text-sm text-[var(--text-soft)]">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration || "নিজস্ব গতি"}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{course.enrolledStudents || 0} জন</span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-1">
            <Star size={16} fill="var(--amber)" className="text-[var(--amber)]" />
            <span className="text-sm font-semibold text-[var(--text-ink)]">
              {course.rating ? course.rating.toFixed(1) : "নতুন"}
            </span>
          </div>
          <span className="text-xl font-bold text-[var(--sage)]">
            {course.price ? `$${course.price}` : "ফ্রি"}
          </span>
        </div>

        <Link
          to={`/course/${course._id}`}
          className="w-full sand-btn justify-center group-hover:shadow-md transition-all text-center"
        >
          <span>বিস্তারিত দেখুন</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default CourseCard;