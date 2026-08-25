import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, PlayCircle, Sparkles, Star, Users, BookOpen, Award,
  Quote, ChevronRight,
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
      {/* soft background washes + faint grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full bg-[var(--sand-almond-silk)] opacity-35 blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-[560px] h-[560px] rounded-full bg-[var(--sand-linen)] opacity-50 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            color: "var(--sand-deep)",
          }}
        />
      </div>

      <div className="relative container-sand grid lg:grid-cols-2 gap-16 items-center pt-28 pb-32">
        {/* LEFT — copy */}
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 28 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] text-sm font-semibold mb-7">
            <Sparkles className="w-4 h-4" />
            <span>নতুন সিজনের কোর্স এসেছে</span>
          </div>

          <h1 className="text-5xl lg:text-[4.25rem] font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] leading-[1.08] tracking-tight">
            আপনার শেখার
            <span className="block text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]">যাত্রা শুরু করুন</span>
          </h1>

          <p className="mt-7 text-lg text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] max-w-xl leading-relaxed">
            Altrion-এর সাথে গুণমানসম্পন্ন কোর্স ও দক্ষ প্রশিক্ষক দিয়ে আপনার দক্ষতা বাড়ান। আজই যোগ দিন হাজারো শিক্ষার্থীর কমিউনিটিতে।
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link to="/courses">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="sand-btn flex items-center space-x-2 text-base">
                <span>কোর্স দেখুন</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="sand-btn-ghost flex items-center space-x-2 text-base">
                <PlayCircle className="w-5 h-5" />
                <span>আমাদের জানুন</span>
              </motion.button>
            </Link>
          </div>

          {/* stats row */}
          <div className="mt-12 flex items-center gap-10">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 14 }} transition={{ delay: 0.3 + i * 0.1 }} className="text-center">
                <div className="text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] mb-1 flex justify-center">{s.icon}</div>
                <div className="text-2xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">{s.value}</div>
                <div className="text-xs text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* social proof */}
          <div className="mt-9 flex items-center space-x-3">
            <div className="flex -space-x-3">
              {["https://i.pravatar.cc/80?img=11","https://i.pravatar.cc/80?img=32","https://i.pravatar.cc/80?img=47","https://i.pravatar.cc/80?img=60"].map((src,i)=>(
                <img key={i} src={src} alt="" className="w-10 h-10 rounded-full border-2 border-[var(--surface-card)] dark:border-[var(--surface-dark-card)] object-cover" />
              ))}
            </div>
            <div className="flex items-center space-x-1 text-[var(--sand-deep)]">
              {[0,1,2,3,4].map(i=><Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <span className="text-sm text-[var(--text-faint)] dark:text-[var(--text-dark-faint)]">১০,০০০+ শিক্ষার্থীর বিশ্বস্ত পছন্দ</span>
          </div>
        </motion.div>

        {/* RIGHT — image + floating cards */}
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.95, y: mounted ? 0 : 20 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative">
          <div className="sand-card overflow-hidden p-2">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000"
              alt="শিক্ষার্থীরা একসাথে শিখছে"
              className="w-full h-[460px] object-cover rounded-[calc(var(--radius-lg)-0.5rem)]"
              onError={(e)=>{e.target.src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg";}}
            />
          </div>

          {/* floating: rating */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 16 }} transition={{ delay: 0.5 }} className="absolute top-6 -left-6 hidden sm:flex items-center space-x-3 bg-[var(--surface-card)] dark:bg-[var(--surface-dark-card)] shadow-xl rounded-2xl px-5 py-4 border border-[var(--line)] dark:border-[var(--line-dark)]">
            <div className="flex items-center space-x-1 text-[var(--sand-deep)]">
              {[0,1,2,3,4].map(i=><Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <div>
              <div className="text-sm font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">৪.৯ / ৫</div>
              <div className="text-xs text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">৮,২৪০ রিভিউ</div>
            </div>
          </motion.div>

          {/* floating: certificate */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 16 }} transition={{ delay: 0.65 }} className="absolute -bottom-7 -right-4 hidden sm:flex items-center space-x-3 bg-[var(--surface-card)] dark:bg-[var(--surface-dark-card)] shadow-xl rounded-2xl px-5 py-4 border border-[var(--line)] dark:border-[var(--line-dark)]">
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
