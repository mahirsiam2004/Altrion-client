import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, PlayCircle, Sparkles, Star, Users, BookOpen, Award,
} from "lucide-react";

const Banner = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const stats = [
    { icon: <Users className="w-5 h-5" />, value: "৫০K+", label: "শিক্ষার্থী" },
    { icon: <BookOpen className="w-5 h-5" />, value: "৫০০+", label: "কোর্স" },
    { icon: <Award className="w-5 h-5" />, value: "৪.৯", label: "রেটিং" },
  ];

  return (
    <section className="relative overflow-hidden bg-[var(--surface)] dark:bg-[var(--surface-dark)]">
      {/* soft background washes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-24 w-[420px] h-[420px] rounded-full bg-[var(--sand-almond-silk)] opacity-40 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-[460px] h-[460px] rounded-full bg-[var(--sand-linen)] opacity-50 blur-3xl" />
      </div>

      <div className="relative container-sand grid lg:grid-cols-2 gap-14 items-center pt-24 pb-28">
        {/* Left: text */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 24 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>নতুন সিজনের কোর্স এসেছে</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] leading-tight">
            আপনার শেখার
            <span className="block text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]">যাত্রা শুরু করুন</span>
          </h1>

          <p className="mt-6 text-lg text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] max-w-xl leading-relaxed">
            Altrion-এর সাথে গুণমানসম্পন্ন কোর্স ও দক্ষ প্রশিক্ষক দিয়ে আপনার দক্ষতা বাড়ান। আজই যোগ দিন হাজারো শিক্ষার্থীর কমিউনিটিতে।
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/courses">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="sand-btn flex items-center space-x-2">
                <span>কোর্স দেখুন</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="sand-btn-ghost flex items-center space-x-2">
                <PlayCircle className="w-5 h-5" />
                <span>আমাদের জানুন</span>
              </motion.button>
            </Link>
          </div>

          <div className="mt-10 flex items-center space-x-6">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 12 }} transition={{ delay: 0.3 + i * 0.1 }} className="text-center">
                <div className="text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] mb-1 flex justify-center">{s.icon}</div>
                <div className="text-2xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">{s.value}</div>
                <div className="text-xs text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex items-center space-x-2 text-sm text-[var(--text-faint)] dark:text-[var(--text-dark-faint)]">
            <div className="flex">{[0,1,2,3,4].map(i=> <Star key={i} className="w-4 h-4 fill-[var(--sand-deep)] text-[var(--sand-deep)]" />)}</div>
            <span>১০,০০০+ শিক্ষার্থীর বিশ্বস্ত পছন্দ</span>
          </div>
        </motion.div>

        {/* Right: image card */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.95 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative">
          <div className="sand-card overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900"
              alt="শিক্ষার্থীরা একসাথে শিখছে"
              className="w-full h-[420px] object-cover"
              onError={(e)=>{e.target.src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg";}}
            />
          </div>
          {/* floating chip */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 16 }} transition={{ delay: 0.6 }} className="absolute -bottom-6 -left-6 hidden sm:flex items-center space-x-3 bg-[var(--surface-card)] dark:bg-[var(--surface-dark-card)] shadow-xl rounded-2xl px-5 py-4 border border-[var(--line)] dark:border-[var(--line-dark)]">
            <div className="w-12 h-12 rounded-full bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] flex items-center justify-center text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]"><Award className="w-6 h-6" /></div>
            <div>
              <div className="text-sm font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">সার্টিফিকেট</div>
              <div className="text-xs text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">কোর্স শেষে পাবেন</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
