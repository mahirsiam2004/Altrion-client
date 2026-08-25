import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import gsap from "gsap";
import Marquee from "react-fast-marquee";
import {
  Play,
  Users,
  BookOpen,
  Award,
  ArrowRight,
  Star,
  TrendingUp,
  Zap,
  Target,
  Rocket,
  Sparkles,
} from "lucide-react";

const Banner = () => {
  const bannerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });
      gsap.from(subtitleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.4,
      });
      gsap.from(statsRef.current.children, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        delay: 0.8,
      });
      gsap.to(".float-1", {
        y: -30,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
      gsap.to(".float-2", {
        y: -20,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 0.5,
      });
      gsap.to(".float-3", {
        y: -25,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 1,
      });
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 20, delay: 1 },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(176,137,104,0.3)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  const iconVariants = {
    hidden: { rotate: -180, scale: 0 },
    visible: {
      rotate: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 15, delay: 1.5 },
    },
  };

  return (
    <div
      ref={bannerRef}
      className="relative min-h-screen bg-[var(--surface)] dark:bg-[var(--surface-dark)] overflow-hidden flex items-center"
    >
      {/* Soft floating background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="float-1 absolute top-20 left-10 w-72 h-72 bg-[var(--sand-almond-cream)] rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30"
          animate={{ x: [0, 100, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="float-2 absolute top-40 right-20 w-96 h-96 bg-[var(--sand-linen)] rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30"
          animate={{ x: [0, -80, 0], y: [0, 80, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="float-3 absolute bottom-20 left-1/2 w-80 h-80 bg-[var(--sand-almond-silk)] rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30"
          animate={{ x: [0, 60, 0], y: [0, -60, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative container-sand py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-block"
            >
              <span className="sand-eyebrow">
                <Sparkles className="w-4 h-4" />
                <span>বাংলাদেশের #১ অনলাইন লার্নিং প্ল্যাটফর্ম</span>
              </span>
            </motion.div>

            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-6 leading-tight"
            >
              আপনার
              <motion.span
                className="block text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                ভবিষ্যৎ গড়ুন
              </motion.span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg sm:text-xl text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-8 max-w-2xl"
            >
              বিশেষজ্ঞদের তৈরি কোর্সের মাধ্যমে নতুন দক্ষতা শিখুন। আজই শুরু করুন
              আপনার স্বপ্নের যাত্রা — হাজারো শিক্ষার্থীর সাথে যোগ দিন।
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <motion.div variants={buttonVariants} initial="hidden" animate="visible" whileHover="hover" whileTap="tap">
                <Link to="/courses" className="sand-btn text-lg">
                  <span>কোর্স দেখুন</span>
                  <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Link>
              </motion.div>
              <motion.div variants={buttonVariants} initial="hidden" animate="visible" whileHover="hover" whileTap="tap">
                <button className="sand-btn-ghost text-lg">
                  <Play className="w-5 h-5" />
                  <span>ডেমো দেখুন</span>
                </button>
              </motion.div>
            </div>

            <div ref={statsRef} className="grid grid-cols-3 gap-6 max-w-xl mx-auto lg:mx-0">
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="text-center p-4 bg-[var(--surface-card)] dark:bg-[var(--surface-dark-card)] rounded-2xl shadow-sm border border-[var(--line)] dark:border-[var(--line-dark)]">
                <div className="text-3xl font-bold text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] mb-1">১০K+</div>
                <div className="text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">শিক্ষার্থী</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, rotate: -5 }} className="text-center p-4 bg-[var(--surface-card)] dark:bg-[var(--surface-dark-card)] rounded-2xl shadow-sm border border-[var(--line)] dark:border-[var(--line-dark)]">
                <div className="text-3xl font-bold text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] mb-1">৫০০+</div>
                <div className="text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">কোর্স</div>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="text-center p-4 bg-[var(--surface-card)] dark:bg-[var(--surface-dark-card)] rounded-2xl shadow-sm border border-[var(--line)] dark:border-[var(--line-dark)]">
                <div className="text-3xl font-bold text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] mb-1">১০০+</div>
                <div className="text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">প্রশিক্ষক</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content - Animated Icons */}
          <motion.div className="relative h-96 lg:h-[600px] hidden lg:block" initial="hidden" animate="visible">
            <motion.div variants={iconVariants} animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 left-20 w-20 h-20 bg-[var(--sand-almond-silk)] rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-10 h-10 text-white" />
            </motion.div>
            <motion.div variants={iconVariants} animate={{ y: [0, -30, 0], rotate: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute top-40 right-10 w-24 h-24 bg-[var(--sand-accent)] rounded-2xl flex items-center justify-center shadow-lg">
              <Users className="w-12 h-12 text-white" />
            </motion.div>
            <motion.div variants={iconVariants} animate={{ y: [0, -25, 0], rotate: [0, 15, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-32 left-10 w-28 h-28 bg-[var(--sand-accent-strong)] rounded-2xl flex items-center justify-center shadow-lg">
              <Award className="w-14 h-14 text-white" />
            </motion.div>
            <motion.div variants={iconVariants} animate={{ y: [0, -15, 0], scale: [1, 1.1, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute bottom-10 right-20 w-16 h-16 bg-[var(--sand-bone)] rounded-full flex items-center justify-center shadow-lg">
              <Play className="w-8 h-8 text-white" />
            </motion.div>
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 1.2 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-[var(--sand-almond-silk)] to-[var(--sand-accent)] rounded-full shadow-xl flex items-center justify-center"
            >
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="text-white text-center">
                <BookOpen className="w-24 h-24 mx-auto mb-4" />
                <p className="text-2xl font-bold">শিখুন</p>
                <p className="text-lg">যেকোনো সময়</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-[var(--sand-accent)] rounded-full flex justify-center">
          <motion.div className="w-2 h-2 bg-[var(--sand-accent)] rounded-full mt-2" animate={{ y: [0, 16, 0] }} transition={{ duration: 2, repeat: Infinity }} />
        </div>
      </motion.div>

      {/* Marquee Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-[var(--surface-card)]/80 dark:bg-[var(--surface-dark-card)]/80 backdrop-blur-sm py-6 border-t border-[var(--line)] dark:border-[var(--line-dark)]">
        <Marquee gradient={false} speed={50} className="overflow-hidden">
          {[
            { icon: <Star className="w-6 h-6" />, text: "সেরা মানের প্ল্যাটফর্ম", color: "text-[var(--sand-accent)]" },
            { icon: <TrendingUp className="w-6 h-6" />, text: "বড় সম্প্রদায়", color: "text-[var(--sand-accent-strong)]" },
            { icon: <Zap className="w-6 h-6" />, text: "দ্রুত শেখা", color: "text-[var(--sand-accent)]" },
            { icon: <Target className="w-6 h-6" />, text: "ক্যারিয়ারমুখী", color: "text-[var(--sand-accent-strong)]" },
            { icon: <Rocket className="w-6 h-6" />, text: "ক্যারিয়ার শুরু করুন", color: "text-[var(--sand-accent)]" },
            { icon: <Award className="w-6 h-6" />, text: "সার্টিফিকেট", color: "text-[var(--sand-accent-strong)]" },
            { icon: <BookOpen className="w-6 h-6" />, text: "৫০০+ কোর্স", color: "text-[var(--sand-accent)]" },
            { icon: <Users className="w-6 h-6" />, text: "দক্ষ প্রশিক্ষক", color: "text-[var(--sand-accent-strong)]" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-3 mx-8 px-6 py-3 bg-[var(--surface-card)] dark:bg-[var(--surface-dark-card)] rounded-full shadow-sm border border-[var(--line)] dark:border-[var(--line-dark)]"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className={item.color}>{item.icon}</span>
              <span className="font-semibold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] whitespace-nowrap hind-siliguri-medium">
                {item.text}
              </span>
            </motion.div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Banner;
