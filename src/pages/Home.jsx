import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, BookOpen, Users, Star, Trophy, Code2, Palette, BarChart3,
  Smartphone, Database, PenTool, Sparkles, Quote,
} from "lucide-react";
import CourseCard from "../components/CourseCard";
import CourseCardSkeleton from "../components/CourseCardSkeleton";
import Showcase3D from "../components/Showcase3D";
import Review from "./Review";
import { coursesAPI } from "../services/api";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Altrion | আপনার শেখার যাত্রা";
    const fetchCourses = async () => {
      try {
        const data = await coursesAPI.getAllCourses();
        setCourses(data ? data.slice(0, 6) : []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const categories = [
    { icon: <Code2 className="w-6 h-6" />, name: "ওয়েব ডেভেলপমেন্ট", count: "১২০+ কোর্স" },
    { icon: <Smartphone className="w-6 h-6" />, name: "মোবাইল অ্যাপ", count: "৮০+ কোর্স" },
    { icon: <Palette className="w-6 h-6" />, name: "UI/UX ডিজাইন", count: "৬০+ কোর্স" },
    { icon: <Database className="w-6 h-6" />, name: "ডেটা সায়েন্স", count: "৯০+ কোর্স" },
    { icon: <BarChart3 className="w-6 h-6" />, name: "ডিজিটাল মার্কেটিং", count: "৭০+ কোর্স" },
    { icon: <PenTool className="w-6 h-6" />, name: "ক্রিয়েটিভ", count: "৫০+ কোর্স" },
  ];

  const features = [
    { icon: <BookOpen className="w-7 h-7" />, title: "গুণমানসম্পন্ন কন্টেন্ট", desc: "বিশেষজ্ঞ প্রশিক্ষকদের তৈরি হাতে-কলমে শেখানো কোর্স।" },
    { icon: <Users className="w-7 h-7" />, title: "সহায়ক কমিউনিটি", desc: "হাজারো শিক্ষার্থীর সাথে শিখুন ও প্রশ্ন করুন।" },
    { icon: <Trophy className="w-7 h-7" />, title: "স্বীকৃত সার্টিফিকেট", desc: "কোর্স শেষে পান আন্তর্জাতিক মানের সার্টিফিকেট।" },
    { icon: <Star className="w-7 h-7" />, title: "৪.৯ রেটিং", desc: "শিক্ষার্থীদের কাছ থেকে পাওয়া উচ্চ সন্তুষ্টি।" },
  ];

  const testimonials = [
    { name: "তানভীর আহমেদ", role: "ওয়েব ডেভেলপার", text: "Altrion-এর কোর্সগুলো আমাকে ফ্রিল্যান্সিং শুরু করতে সাহায্য করেছে।" },
    { name: "সাবরিনা খান", role: "UI ডিজাইনার", text: "প্র্যাকটিক্যাল প্রজেক্টগুলো শেখাকে অনেক মজার করে তুলেছে।" },
    { name: "রাকিব হাসান", role: "ডেটা অ্যানালিস্ট", text: "সহজ ভাষায় জটিল বিষয় বোঝানোর জন্য Altrion সেরা।" },
  ];

  return (
    <div className="bg-[var(--cream)]">
      {/* Categories - simplified */}
      <section className="py-16 lg:py-24">
        <div className="container-sand">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-10">
            <span className="sand-eyebrow mb-4">বিষয়সমূহ</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-ink)] mt-4">যেকোনো দক্ষতা এখানে শিখুন</h2>
            <p className="text-[var(--text-soft)] mt-3">আপনার পছন্দের বিষয় বেছে নিন এবং যাত্রা শুরু করুন</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="sand-card p-5 text-center hover:-translate-y-1 transition-transform cursor-pointer group">
                <div className="w-12 h-12 mx-auto rounded-xl bg-[var(--sage-light)] flex items-center justify-center text-[var(--sage)] group-hover:bg-[var(--sage)] group-hover:text-white transition-all mb-3">{c.icon}</div>
                <h3 className="font-semibold text-[var(--text-ink)] text-sm">{c.name}</h3>
                <p className="text-xs text-[var(--text-faint)] mt-1">{c.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - simplified */}
      <section className="py-16 lg:py-24 bg-[var(--surface)]">
        <div className="container-sand">
          <div className="grid md:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="text-center p-4">
                <div className="w-14 h-14 mx-auto rounded-xl bg-[var(--sage-light)] flex items-center justify-center mb-4 text-[var(--sage)]">{f.icon}</div>
                <h3 className="font-semibold text-[var(--text-ink)] mb-2 text-base">{f.title}</h3>
                <p className="text-sm text-[var(--text-soft)]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular courses - clean grid */}
      <section className="py-16 lg:py-24">
        <div className="container-sand">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
            <div>
              <span className="sand-eyebrow mb-4">জনপ্রিয়</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-ink)] mt-4">সেরা কোর্সগুলো</h2>
            </div>
            <Link to="/courses" className="sand-btn-ghost inline-flex items-center space-x-2 self-start">
              <span>সব কোর্স</span><ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => <CourseCardSkeleton key={n} />)}
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <motion.div key={course._id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-[var(--text-soft)]">কোনো কোর্স পাওয়া যায়নি।</div>
          )}
        </div>
      </section>

      {/* Showcase 3D - keep but minimal */}
      <Showcase3D />

      {/* Testimonials - simplified */}
      <section className="py-16 lg:py-24 bg-[var(--surface)]">
        <div className="container-sand">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <span className="sand-eyebrow mb-4">শিক্ষার্থীদের কথা</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-ink)] mt-4">তাঁরা কী বলেন</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="sand-card p-5">
                <Quote className="w-7 h-7 text-[var(--sage-light)] mb-3" />
                <p className="text-[var(--text-soft)] mb-5 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--sage-light)] flex items-center justify-center text-[var(--sage)] font-bold">{t.name.charAt(0)}</div>
                  <div>
                    <div className="font-semibold text-[var(--text-ink)] text-sm">{t.name}</div>
                    <div className="text-xs text-[var(--text-faint)]">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Review />

      {/* CTA - minimal */}
      <section className="py-16 lg:py-24">
        <div className="container-sand">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-[var(--sage)] rounded-3xl p-8 md:p-12 text-center">
            <Sparkles className="w-10 h-10 text-white mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">আজই শেখা শুরু করুন</h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">সময় আর নষ্ট নয় — আপনার ভবিষ্যৎ গড়ুন Altrion-এর সাথে।</p>
            <Link to="/signup">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-white text-[var(--sage)] rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all">
                ফ্রি একাউন্ট খুলুন
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;