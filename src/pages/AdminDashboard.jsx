import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Users, GraduationCap, TrendingUp, Plus, Shield } from "lucide-react";
import { coursesAPI } from "../services/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalCourses: 0, totalStudents: 0, totalEnrollments: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "অ্যাডমিন ড্যাশবোর্ড - Altrion";
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const courses = await coursesAPI.getAllCourses();
      const courseArr = Array.isArray(courses) ? courses : [];
      const totalStudents = courseArr.reduce((s, c) => s + (c.enrolledStudents || 0), 0);
      setStats({ totalCourses: courseArr.length, totalStudents, totalEnrollments: totalStudents });
    } catch (err) {
      console.error("Admin stats error:", err);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    { title: "মোট কোর্স", value: loading ? "..." : stats.totalCourses, icon: <BookOpen className="w-8 h-8" />, color: "from-[var(--sand-almond-silk)] to-[var(--sand-accent)]" },
    { title: "মোট শিক্ষার্থী", value: loading ? "..." : stats.totalStudents, icon: <Users className="w-8 h-8" />, color: "from-[var(--sand-accent)] to-[var(--sand-accent-strong)]" },
    { title: "মোট এনরোলমেন্ট", value: loading ? "..." : stats.totalEnrollments, icon: <GraduationCap className="w-8 h-8" />, color: "from-[var(--sand-deep)] to-[var(--sand-accent-strong)]" },
  ];

  return (
    <div className="min-h-screen bg-[var(--surface)] dark:bg-[var(--surface-dark)] py-12">
      <div className="container-sand">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="w-8 h-8 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]" />
            <h1 className="text-4xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">অ্যাডমিন ড্যাশবোর্ড</h1>
          </div>
          <p className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">প্ল্যাটফর্মের সামগ্রিক অবস্থা দেখুন</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {cards.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5 }} className="sand-card p-6">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-sm mb-4`}>{stat.icon}</div>
              <h3 className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] text-sm font-semibold mb-1">{stat.title}</h3>
              <p className="text-4xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link to="/dashboard/admin/courses" className="sand-card p-6 flex items-center space-x-4 hover:-translate-y-1 transition-transform group">
            <div className="w-14 h-14 rounded-2xl bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] flex items-center justify-center text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]"><BookOpen className="w-7 h-7" /></div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">কোর্স ম্যানেজ</h3>
              <p className="text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">সব কোর্স দেখুন ও মুছুন</p>
            </div>
          </Link>
          <Link to="/dashboard/admin/users" className="sand-card p-6 flex items-center space-x-4 hover:-translate-y-1 transition-transform group">
            <div className="w-14 h-14 rounded-2xl bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] flex items-center justify-center text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]"><Users className="w-7 h-7" /></div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">ইউজার ম্যানেজ</h3>
              <p className="text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">ব্যবহারকারীদের তালিকা</p>
            </div>
          </Link>
          <Link to="/dashboard/add-course" className="sand-card p-6 flex items-center space-x-4 hover:-translate-y-1 transition-transform group md:col-span-2">
            <div className="w-14 h-14 rounded-2xl bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] flex items-center justify-center text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]"><Plus className="w-7 h-7" /></div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">নতুন কোর্স যোগ</h3>
              <p className="text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">নতুন কোর্স তৈরি করুন</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
