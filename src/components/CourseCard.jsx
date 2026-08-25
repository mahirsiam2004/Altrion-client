import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Clock, Users, ArrowRight } from "lucide-react";

const CourseCard = ({ course }) => {
  if (!course) return null;

  return (
    <motion.div
      className="sand-card flex flex-col h-full overflow-hidden group"
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.imageURL || "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => { e.target.src = "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg"; }}
        />
        {course.isFeatured && (
          <span className="absolute top-3 right-3 px-3 py-1 bg-[var(--sand-accent)] text-white text-xs font-bold rounded-full shadow-sm">
            বিশেষ
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="inline-block px-3 py-1 bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] text-xs font-semibold rounded-full mb-3 w-fit">
          {course.category || "সাধারণ"}
        </span>

        <h2 className="text-xl font-bold mb-2 text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] line-clamp-2">
          {course.title}
        </h2>

        <p className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] text-sm mb-4 line-clamp-3 flex-grow">
          {course.description || "কোনো বিবরণ নেই।"}
        </p>

        {course.instructor && (
          <div className="flex items-center space-x-2 mb-4 pb-4 border-b border-[var(--line)] dark:border-[var(--line-dark)]">
            <img
              src={course.instructor.photo || "https://via.placeholder.com/32?text=I"}
              alt={course.instructor.name}
              className="w-8 h-8 rounded-full object-cover"
              onError={(e) => { e.target.src = "https://via.placeholder.com/32?text=I"; }}
            />
            <div>
              <p className="text-xs text-[var(--text-faint)] dark:text-[var(--text-dark-faint)]">প্রশিক্ষক</p>
              <p className="text-sm font-semibold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">
                {course.instructor.name || "অজানা"}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4 text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">
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
            <Star size={16} fill="#e0a458" className="text-[var(--sand-accent)]" />
            <span className="text-sm font-semibold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">
              {course.rating ? course.rating.toFixed(1) : "নতুন"}
            </span>
          </div>
          <span className="text-2xl font-bold text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]">
            {course.price ? `$${course.price}` : "ফ্রি"}
          </span>
        </div>

        <Link
          to={`/course/${course._id}`}
          className="w-full sand-btn group-hover:shadow-md transition-all text-center"
        >
          <span>বিস্তারিত দেখুন</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default CourseCard;
