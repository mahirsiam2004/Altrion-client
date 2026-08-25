import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { GraduationCap } from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { enrollmentsAPI } from "../services/api";

const MyEnrolledCourses = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) fetchEnrolledCourses();
  }, [user]);

  const fetchEnrolledCourses = async () => {
    try {
      const data = await enrollmentsAPI.getEnrollmentsByUser(user.email);
      setCourses(data);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      toast.error("আপনার এনরোল করা কোর্স লোড করা যায়নি");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--surface)] dark:bg-[var(--surface-dark)]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--sand-accent)]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--surface)] dark:bg-[var(--surface-dark)] py-12">
      <div className="container-sand">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-2">আমার শেখা কোর্স</h1>
          <p className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">আপনার শেখার যাত্রা চালিয়ে যান</p>
        </div>

        {courses.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="sand-card p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] flex items-center justify-center">
              <GraduationCap className="w-10 h-10 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-2">এখনো কোনো কোর্সে এনরোল করেননি</h3>
            <p className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-6">আজই একটি কোর্সে এনরোল করে শেখা শুরু করুন</p>
            <Link to="/courses" className="sand-btn inline-block">কোর্স ব্রাউজ করুন</Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div key={course._id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
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
