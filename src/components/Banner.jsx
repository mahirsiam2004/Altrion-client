import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, PlayCircle, Sparkles, Star, Users, BookOpen, Award,
  CheckCircle2, TrendingUp, Clock,
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
    <section className="relative overflow-hidden bg-[var(--cream)] min-h-[82vh] flex items-center">
      {/* soft background washes — exact palette */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full bg-[var(--sage-light)] opacity-30 blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-[560px] h-[560px] rounded-full bg-[var(--sage)] opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 w-[400px] h-[400px] rounded-full bg-[var(--amber)] opacity-15 blur-3xl" />
        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--sage) 1px, transparent 1px), linear-gradient(90deg, var(--sage) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative container-sand py-20 lg:py-28 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* LEFT — Bangla copy */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 28 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[var(--sage-light)] text-[var(--sage)] text-sm font-semibold mb-7">
              <Sparkles className="w-4 h-4" />
              <span>নতুন সিজনের কোর্স এসেছে</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-ink)] leading-[1.08] tracking-tight mb-6">
              অসীম জ্ঞান এখন
              <span className="block text-[var(--sage)]">আপনার হাতে</span>
            </h1>

            <p className="text-lg text-[var(--text-soft)] max-w-xl leading-relaxed mb-9">
              Altrion নিয়ে আসে বিশ্বমানের প্রশিক্ষক, ছোট ছোট পাঠ আর ইন্টারেক্টিভ
              প্রজেক্ট — সরাসরি আপনার স্ক্রিনে। নিজের গতিতে শিখুন, সার্টিফিকেট
              অর্জন করুন আর সুন্দর ড্যাশবোর্ডে প্রগ্রেস ট্র্যাক করুন।
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 mb-10">
              <Link to="/courses">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="sand-btn flex items-center space-x-2 text-base px-8 py-3.5"
                >
                  <span>সব কোর্স দেখুন</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="sand-btn-ghost flex items-center space-x-2 text-base px-8 py-3.5"
                >
                  <PlayCircle className="w-5 h-5" />
                  <span>আমাদের জানুন</span>
                </motion.button>
              </Link>
            </div>

            {/* stats row */}
            <div className="flex items-center gap-8 md:gap-10">
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 14 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center sm:text-left"
                >
                  <div className="text-[var(--sage)] mb-1 flex sm:block justify-center">{s.icon}</div>
                  <div className="text-2xl sm:text-3xl font-bold text-[var(--text-ink)]">{s.value}</div>
                  <div className="text-xs text-[var(--text-faint)] font-medium">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — relevant professional course-preview card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.95, y: mounted ? 0 : 24 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="relative"
          >
            {/* main card */}
            <div className="relative rounded-3xl bg-white dark:bg-[var(--surface-dark-card)] shadow-2xl border border-[var(--line)] overflow-hidden">
              {/* thumbnail */}
              <div
                className="relative h-44 flex items-center justify-center"
                style={{ backgroundImage: "linear-gradient(135deg, var(--sage) 0%, var(--sage-dark, #6f8470) 100%)" }}
              >
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                  <PlayCircle className="w-8 h-8 text-[var(--sage)]" />
                </div>
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[var(--amber)] text-[var(--cream)] text-xs font-semibold">
                  লাইভ ক্লাস
                </span>
              </div>

              {/* body */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[var(--sage-light)] text-[var(--sage)]">ওয়েব ডেভেলপমেন্ট</span>
                  <span className="flex items-center gap-1 text-xs text-[var(--amber)] font-semibold">
                    <Star className="w-3.5 h-3.5 fill-current" /> ৪.৯
                  </span>
                </div>
                <h3 className="font-bold text-[var(--text-ink)] text-lg leading-snug mb-3">
                  ফুল স্ট্যাক ওয়েব ডেভেলপমেন্ট — হাতে-কলমে বুটক্যাম্প
                </h3>

                {/* progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-[var(--text-soft)] mb-1">
                    <span>আপনার প্রগ্রেস</span>
                    <span className="font-semibold text-[var(--sage)]">৬৮%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--sage-light)] overflow-hidden">
                    <div className="h-full rounded-full bg-[var(--sage)]" style={{ width: "68%" }} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[var(--line)]">
                  <div className="flex items-center gap-2">
                    <img src="https://i.pravatar.cc/80?img=12" alt="" className="w-8 h-8 rounded-full object-cover" />
                    <span className="text-xs text-[var(--text-soft)]">আমিন হোসেন</span>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-[var(--text-soft)]">
                    <Clock className="w-3.5 h-3.5" /> ৪২ ঘণ্টা
                  </span>
                </div>
              </div>
            </div>

            {/* floating chip — students */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 16 }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-2 bg-white dark:bg-[var(--surface-dark-card)] rounded-2xl shadow-xl border border-[var(--line)] px-4 py-3"
            >
              <div className="w-9 h-9 rounded-full bg-[var(--sage-light)] flex items-center justify-center text-[var(--sage)]">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-[var(--text-ink)]">৫০K+ শিক্ষার্থী</div>
                <div className="text-[10px] text-[var(--text-faint)]">ইতিমধ্যে যোগ দিয়েছেন</div>
              </div>
            </motion.div>

            {/* floating chip — certificate */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : -16 }}
              transition={{ delay: 0.75 }}
              className="absolute -top-5 -right-4 hidden sm:flex items-center gap-2 bg-white dark:bg-[var(--surface-dark-card)] rounded-2xl shadow-xl border border-[var(--line)] px-4 py-3"
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--amber)]" style={{ backgroundColor: "color-mix(in srgb, var(--amber) 18%, transparent)" }}>
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-[var(--text-ink)]">সার্টিফিকেট</div>
                <div className="text-[10px] text-[var(--text-faint)]">সমাপ্তিতে পান</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
