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
  Award as Trophy,
} from "lucide-react";

const Banner = () => {
  const bannerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation with GSAP
      gsap.from(titleRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2,
      });

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.4,
      });

      // Stats animation
      gsap.from(statsRef.current.children, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        delay: 0.8,
      });

      // Floating animation for background elements
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
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  const iconVariants = {
    hidden: { rotate: -180, scale: 0 },
    visible: {
      rotate: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 1.5,
      },
    },
  };

  return (
    <div
      ref={bannerRef}
      className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden flex items-center"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="float-1 absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="float-2 absolute top-40 right-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="float-3 absolute bottom-20 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 60, 0],
            y: [0, -60, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-block"
            >
              <span className="inline-flex items-center space-x-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-6">
                <Award className="w-4 h-4" />
                <span>🎉 #1 Online Learning Platform</span>
              </span>
            </motion.div>

            {/* Title */}
            <h1
              ref={titleRef}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Transform Your
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Future Today
              </motion.span>
            </h1>

            {/* Subtitle */}
            <p
              ref={subtitleRef}
              className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl"
            >
              Join thousands of learners worldwide and unlock your potential
              with our expert-led courses. Start your journey to success today!
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
              >
                <Link
                  to="/courses"
                  className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-indigo-600 text-white rounded-full font-semibold text-lg shadow-lg"
                >
                  <span>Explore Courses</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
              >
                <button className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white text-indigo-600 rounded-full font-semibold text-lg shadow-lg border-2 border-indigo-600">
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </motion.div>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-6 max-w-xl mx-auto lg:mx-0"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-center p-4 bg-white rounded-xl shadow-md"
              >
                <div className="text-3xl font-bold text-indigo-600 mb-1">
                  10K+
                </div>
                <div className="text-sm text-gray-600">Students</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="text-center p-4 bg-white rounded-xl shadow-md"
              >
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  500+
                </div>
                <div className="text-sm text-gray-600">Courses</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-center p-4 bg-white rounded-xl shadow-md"
              >
                <div className="text-3xl font-bold text-pink-600 mb-1">
                  100+
                </div>
                <div className="text-sm text-gray-600">Instructors</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content - Animated Icons */}
          <motion.div
            className="relative h-96 lg:h-[600px] hidden lg:block"
            initial="hidden"
            animate="visible"
          >
            {/* Floating Icons */}
            <motion.div
              variants={iconVariants}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-10 left-20 w-20 h-20 bg-indigo-500 rounded-2xl flex items-center justify-center shadow-2xl"
            >
              <BookOpen className="w-10 h-10 text-white" />
            </motion.div>

            <motion.div
              variants={iconVariants}
              animate={{
                y: [0, -30, 0],
                rotate: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute top-40 right-10 w-24 h-24 bg-purple-500 rounded-2xl flex items-center justify-center shadow-2xl"
            >
              <Users className="w-12 h-12 text-white" />
            </motion.div>

            <motion.div
              variants={iconVariants}
              animate={{
                y: [0, -25, 0],
                rotate: [0, 15, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-32 left-10 w-28 h-28 bg-pink-500 rounded-2xl flex items-center justify-center shadow-2xl"
            >
              <Award className="w-14 h-14 text-white" />
            </motion.div>

            <motion.div
              variants={iconVariants}
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              className="absolute bottom-10 right-20 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-2xl"
            >
              <Play className="w-8 h-8 text-white" />
            </motion.div>

            {/* Center Large Circle */}
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 1.2,
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full shadow-2xl flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="text-white text-center"
              >
                <BookOpen className="w-24 h-24 mx-auto mb-4" />
                <p className="text-2xl font-bold">Learn</p>
                <p className="text-lg">Anytime</p>
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
        <div className="w-6 h-10 border-2 border-indigo-600 rounded-full flex justify-center">
          <motion.div
            className="w-2 h-2 bg-indigo-600 rounded-full mt-2"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* Fancy Marquee Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm py-6 border-t border-gray-200">
        <Marquee gradient={false} speed={50} className="overflow-hidden">
          {[
            {
              icon: <Star className="w-6 h-6" />,
              text: "Top Rated Platform",
              color: "text-yellow-500",
            },
            {
              icon: <TrendingUp className="w-6 h-6" />,
              text: "Growing Community",
              color: "text-green-500",
            },
            {
              icon: <Zap className="w-6 h-6" />,
              text: "Fast Learning",
              color: "text-blue-500",
            },
            {
              icon: <Target className="w-6 h-6" />,
              text: "Career Focused",
              color: "text-red-500",
            },
            {
              icon: <Rocket className="w-6 h-6" />,
              text: "Launch Your Career",
              color: "text-purple-500",
            },
            {
              icon: <Trophy className="w-6 h-6" />,
              text: "Industry Certified",
              color: "text-orange-500",
            },
            {
              icon: <BookOpen className="w-6 h-6" />,
              text: "500+ Courses",
              color: "text-indigo-500",
            },
            {
              icon: <Users className="w-6 h-6" />,
              text: "Expert Instructors",
              color: "text-pink-500",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center space-x-3 mx-8 px-6 py-3 bg-white rounded-full shadow-md border border-gray-200"
              whileHover={{ scale: 1.1, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className={item.color}>{item.icon}</span>
              <span className="font-semibold text-gray-800 whitespace-nowrap">
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
