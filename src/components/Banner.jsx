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
    <section className="relative overflow-hidden bg-[var(--cream)] min-h-[70vh] flex items-center">
      {/* soft background washes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full bg-[var(--sage-light)] opacity-30 blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-[560px] h-[560px] rounded-full bg-[var(--sage)] opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-[var(--amber)] opacity-15 blur-3xl" />
      </div>

      <div className="relative container-sand py-20 lg:py-28 w-full">
        {/* CENTERED Bangla copy with Altrion */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 28 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center max-w-5xl mx-auto"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[var(--sage-light)] text-[var(--sage)] text-sm font-semibold mb-7">
            <Sparkles className="w-4 h-4" />
            <span>নতুন সিজনের কোর্স এসেছে</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[4.5rem] font-bold text-[var(--text-ink)] leading-[1.05] tracking-tight mb-6">
            আপনার শেখার
            <span className="block text-[var(--sage)]">যাত্রা শুরু করুন</span>
          </h1>

          <p className="text-lg text-[var(--text-soft)] max-w-2xl mx-auto leading-relaxed mb-10">
            Altrion-এর সাথে গুণমানসম্পন্ন কোর্স ও দক্ষ প্রশিক্ষক দিয়ে আপনার দক্ষতা বাড়ান। আজই যোগ দিন হাজারো শিক্ষার্থীর কমিউনিটিতে।
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link to="/courses">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="sand-btn flex items-center space-x-2 text-base px-8 py-3">
                <span>কোর্স দেখুন</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="sand-btn-ghost flex items-center space-x-2 text-base px-8 py-3">
                <PlayCircle className="w-5 h-5" />
                <span>আমাদের জানুন</span>
              </motion.button>
            </Link>
          </div>

          {/* stats row */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 14 }} transition={{ delay: 0.3 + i * 0.1 }} className="text-center">
                <div className="text-[var(--sage)] mb-1 flex justify-center">{s.icon}</div>
                <div className="text-2xl sm:text-3xl font-bold text-[var(--text-ink)]">{s.value}</div>
                <div className="text-xs text-[var(--text-faint)] font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* social proof */}
          <div className="mt-10 flex items-center justify-center space-x-3">
            <div className="flex -space-x-3">
              {["https://i.pravatar.cc/80?img=11","https://i.pravatar.cc/80?img=32","https://i.pravatar.cc/80?img=47","https://i.pravatar.cc/80?img=60"].map((src,i)=>(
                <img key={i} src={src} alt="" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-md" />
              ))}
            </div>
            <div className="flex items-center space-x-1 text-[var(--amber)]">
              {[0,1,2,3,4].map(i=><Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <span className="text-sm text-[var(--text-faint)]">১০,০০০+ শিক্ষার্থীর বিশ্বস্ত পছন্দ</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;