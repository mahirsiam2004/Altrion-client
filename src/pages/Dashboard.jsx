import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen, Plus, GraduationCap, TrendingUp, Users, Award, Clock, Lightbulb,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { coursesAPI, enrollmentsAPI } from "../services/api";
import { toast } from "react-toastify";

export const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ myCourses: 0, enrolledCourses: 0, totalStudents: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "ড্যাশবোর্ড - Altrion";
    if (user?.email) fetchDashboardStats();
  }, [user]);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      let coursesData = [];
      try {
        coursesData = await coursesAPI.getCoursesByInstructor(user.email);
        if (!Array.isArray(coursesData)) coursesData = [];
      } catch (err) {
        console.error("Failed to fetch instructor courses:", err);
        coursesData = [];
      }
      let enrolledData = [];
      try {
        enrolledData = await enrollmentsAPI.getEnrollmentsByUser(user.email);
        if (!Array.isArray(enrolledData)) enrolledData = [];
      } catch (err) {
        console.error("Failed to fetch enrollments:", err);
        enrolledData = [];
      }
      const totalStudents = coursesData.reduce((sum, course) => sum + (course.enrolledStudents || 0), 0);
      setStats({ myCourses: coursesData.length, enrolledCourses: enrolledData.length, totalStudents });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      toast.error("ড্যাশবোর্ড ডেটা লোড করা যায়নি");
    } finally {
      setLoading(false);
    }
  };

  const quickLinks = [
    { title: "নতুন কোর্স", description: "নতুন কোর্স তৈরি ও শেয়ার করুন", icon: <Plus className="w-8 h-8" />, link: "/dashboard/add-course", color: "from-[var(--sand-almond-silk)] to-[var(--sand-accent)]" },
    { title: "আমার কোর্স", description: "আপনার তৈরি কোর্স ম্যানেজ করুন", icon: <BookOpen className="w-8 h-8" />, link: "/dashboard/my-courses", color: "from-[var(--sand-accent)] to-[var(--sand-accent-strong)]" },
    { title: "আমার শেখা", description: "শেখার যাত্রা চালিয়ে যান", icon: <GraduationCap className="w-8 h-8" />, link: "/dashboard/my-enrolled-courses", color: "from-[var(--sand-deep)] to-[var(--sand-accent-strong)]" },
    { title: "সব কোর্স", description: "সব কোর্স ব্রাউজ করুন", icon: <TrendingUp className="w-8 h-8" />, link: "/courses", color: "from-[var(--sand-bone)] to-[var(--sand-deep)]" },
  ];

  return (
    <div className="min-h-screen bg-[var(--surface)] dark:bg-[var(--surface-dark)] py-12">
      <div className="container-sand">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex items-center space-x-4 mb-6">
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.displayName} className="w-20 h-20 rounded-full border-4 border-[var(--sand-almond-silk)] shadow-sm" onError={(e) => { e.target.src = "https://via.placeholder.com/80"; }} />
            ) : (
              <div className="w-20 h-20 rounded-full bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] flex items-center justify-center border-4 border-[var(--sand-almond-silk)]">
                <Users className="w-10 h-10 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]" />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">
                ফিরে আসার অভিনন্দন, {user?.displayName || "ব্যবহারকারী"}!
              </h1>
              <p className="text-lg text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mt-1">
                আজ আপনার কোর্সগুলোতে কী চলছে তা দেখুন
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { title: "আমার কোর্স", value: loading ? "..." : stats.myCourses, icon: <BookOpen className="w-8 h-8" />, color: "from-[var(--sand-almond-silk)] to-[var(--sand-accent)]" },
            { title: "এনরোল করা কোর্স", value: loading ? "..." : stats.enrolledCourses, icon: <GraduationCap className="w-8 h-8" />, color: "from-[var(--sand-accent)] to-[var(--sand-accent-strong)]" },
            { title: "মোট শিক্ষার্থী", value: loading ? "..." : stats.totalStudents, icon: <Users className="w-8 h-8" />, color: "from-[var(--sand-deep)] to-[var(--sand-accent-strong)]" },
          ].map((stat, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ y: -5, scale: 1.02 }} className="sand-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-sm`}>{stat.icon}</div>
                <TrendingUp className="w-6 h-6 text-[var(--sand-accent)]" />
              </div>
              <h3 className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] text-sm font-semibold mb-1">{stat.title}</h3>
              <p className="text-4xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-6">দ্রুত কাজ</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.1 }} whileHover={{ y: -10, scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to={link.link} className="block sand-card p-6 group">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center text-white mb-4 shadow-sm group-hover:scale-110 transition-transform`}>{link.icon}</div>
                  <h3 className="text-xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-2">{link.title}</h3>
                  <p className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] text-sm">{link.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8 p-4 bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] border border-[var(--sand-almond-silk)] rounded-2xl">
            <p className="text-sm text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]">
              <Lightbulb className="w-4 h-4 inline mr-1" /> <strong>টিপস:</strong> কোর্স আপডেট করতে "আমার কোর্স"-এ যান এবং যেকোনো কার্ডে "আপডেট" বাটনে চাপ দিন।
            </p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="sand-card p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">সাম্প্রতিক কার্যকলাপ</h2>
            <Clock className="w-6 h-6 text-[var(--text-faint)]" />
          </div>
          <div className="space-y-4">
            {[
              { icon: <Award className="w-5 h-5 text-[var(--sand-accent)]" />, text: "আপনি ১০০+ শিক্ষার্থীর মাইলস্টোন ছুঁয়েছেন!", time: "২ ঘণ্টা আগে" },
              { icon: <BookOpen className="w-5 h-5 text-[var(--sand-accent-strong)]" />, text: "'ওয়েব ডেভেলপমেন্ট বুটক্যাম্প'-এ নতুন শিক্ষার্থী ভর্তি হয়েছে", time: "৫ ঘণ্টা আগে" },
              { icon: <GraduationCap className="w-5 h-5 text-[var(--sand-deep)]" />, text: "আপনি 'ডেটা সায়েন্স প্রো' কোর্স শেষ করেছেন", time: "১ দিন আগে" },
            ].map((activity, index) => (
              <motion.div key={index} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + index * 0.1 }} className="flex items-center space-x-4 p-4 bg-[var(--surface-soft)] dark:bg-[var(--surface-dark-soft)] rounded-xl hover:opacity-90 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-[var(--surface-card)] dark:bg-[var(--surface-dark-card)] rounded-full flex items-center justify-center">{activity.icon}</div>
                <div className="flex-1">
                  <p className="text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] font-medium">{activity.text}</p>
                  <p className="text-sm text-[var(--text-faint)] dark:text-[var(--text-dark-faint)]">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
