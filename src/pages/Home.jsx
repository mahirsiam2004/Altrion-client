import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, BookOpen, Users, Star, Trophy, Code2, Palette, BarChart3,
  Smartphone, Database, PenTool, Sparkles, Quote, PlayCircle, Clock,
  Signal, GraduationCap, UserPlus, Target, CheckCircle2,
} from "lucide-react";
import CourseCard from "../components/CourseCard";
import CourseCardSkeleton from "../components/CourseCardSkeleton";
import Review from "./Review";
import Banner from "../components/Banner";
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

  const upcomingLiveCourses = [
    { title: "ফুল স্ট্যাক ওয়েব ডেভেলপমেন্ট", instructor: "আমিন হোসেন", duration: "৫ দিন ধরে", level: "সবার জন্য", icon: <Code2 className="w-6 h-6" />, price: "৳২,৯৯৯" },
    { title: "ইউআই/ইউএক্স ডিজাইন বেসিক", instructor: "রাবি আক্তা", duration: "৭ দিন ধরে", level: "মৌলিক", icon: <Palette className="w-6 h-6" />, price: "৳১,৯৯৯" },
    { title: "ডেটা সায়েন্স ফান্ডামেন্টাল", instructor: "সিমাব কুমার", duration: "৩ দিন ধরে", level: "মৌলিক", icon: <Database className="w-6 h-6" />, price: "৳১,৪৯৯" },
  ];

  const freeDemoCourses = [
    { title: "ওয়েব ডেভেলপমেন্টের বিস্তারিত", category: "ওয়েব", rating: "4.9", students: "৫০০+", icon: <Code2 className="w-6 h-6" /> },
    { title: "মোবাইল অ্যাপ ডেভেলপমেন্ট", category: "অ্যাপ", rating: "4.8", students: "৩০০+", icon: <Smartphone className="w-6 h-6" /> },
    { title: "ইউআই/ইউএক্স বেসিক", category: "ডিজাইন", rating: "4.7", students: "২০০+", icon: <Palette className="w-6 h-6" /> },
  ];

  const howItWorks = [
    { step: "০১", icon: <UserPlus className="w-7 h-7" />, title: "অ্যাকাউন্ট খুলুন", desc: "মাত্র ২ মিনিটে ফ্রি অ্যাকাউন্ট তৈরি করুন এবং শেখা শুরু করুন।" },
    { step: "০২", icon: <Target className="w-7 h-7" />, title: "কোর্স বেছে নিন", desc: "আপনার লক্ষ্য অনুযায়ী সেরা কোর্স বা লাইভ ক্লাস নির্বাচন করুন।" },
    { step: "০৩", icon: <GraduationCap className="w-7 h-7" />, title: "সার্টিফিকেট পান", desc: "কোর্স শেষে মূল্যায়নে পাস করলে পান স্বীকৃত সার্টিফিকেট।" },
  ];

  return (
    <div className="bg-[var(--cream)]">
      {/* Hero Banner */}
      <Banner />

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

      {/* How it works — replaces old 3D showcase */}
      <section className="py-16 lg:py-24" style={{ backgroundImage: "linear-gradient(135deg, var(--sage-light) 0%, var(--cream) 100%)" }}>
        <div className="container-sand">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="sand-eyebrow mb-4">কিভাবে কাজ করে</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-ink)] mb-4">তিন ধাপে শুরু করুন</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {howItWorks.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative sand-card p-7 text-center hover:shadow-xl transition-shadow"
              >
                <div className="absolute top-4 right-5 text-5xl font-black text-[var(--sage-light)] opacity-60 select-none">{s.step}</div>
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[var(--sage)] flex items-center justify-center text-white mb-5 shadow-lg">{s.icon}</div>
                <h3 className="font-bold text-[var(--text-ink)] text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-[var(--text-soft)] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Live Courses — class-booking cards */}
      <section className="py-16 lg:py-24">
        <div className="container-sand">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="sand-eyebrow mb-4">আসন্ন লাইভ</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-ink)] mb-4">আমাদের আসন্ন লাইভ কোর্স</h2>
            <p className="text-[var(--text-soft)] max-w-xl mx-auto">সরাসরি প্রশিক্ষকের সাথে শিখুন — আসন সীমিত, আগে আসলে আগে পাবেন।</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingLiveCourses.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative bg-white dark:bg-[var(--surface-dark-card)] rounded-2xl overflow-hidden border border-[var(--line)] shadow-sm hover:shadow-2xl transition-all duration-300"
              >
                {/* thumbnail */}
                <div
                  className="relative h-32 flex items-center justify-center"
                  style={{ backgroundImage: "linear-gradient(135deg, var(--sage) 0%, var(--sage-dark, #6f8470) 100%)" }}
                >
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
                  <div className="w-14 h-14 rounded-2xl bg-white/90 flex items-center justify-center text-[var(--sage)] shadow-lg">{c.icon}</div>
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--amber)] text-[var(--cream)] text-xs font-semibold">
                    <Signal className="w-3.5 h-3.5" /> লাইভ
                  </span>
                </div>

                {/* body */}
                <div className="p-5">
                  <h3 className="font-bold text-[var(--text-ink)] text-lg leading-snug mb-3">{c.title}</h3>

                  <div className="flex items-center gap-2 mb-3">
                    <img src={`https://i.pravatar.cc/80?img=${10 + i}`} alt="" className="w-8 h-8 rounded-full object-cover" />
                    <div className="text-sm">
                      <span className="text-[var(--text-faint)] text-xs">শিক্ষক </span>
                      <span className="font-semibold text-[var(--text-ink)]">{c.instructor}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-[var(--sage-light)] text-[var(--sage)] font-medium">
                      <Clock className="w-3.5 h-3.5" /> {c.duration}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-[var(--cream)] dark:bg-[var(--surface-dark-soft)] text-[var(--text-soft)] font-medium border border-[var(--line)]">
                      {c.level}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[var(--line)]">
                    <span className="text-xl font-extrabold text-[var(--text-ink)]">{c.price}</span>
                    <Link to="/signup" className="sand-btn text-sm px-4 py-2 inline-flex items-center gap-1">
                      এনরোল করুন <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Demo Courses — polished cards */}
      <section className="py-16 lg:py-24 bg-[var(--surface)]">
        <div className="container-sand">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="sand-eyebrow mb-4">মুক্ত ডেমো</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-ink)] mb-4">ফ্রি ডেমো কোর্সগুলো নিন</h2>
            <p className="text-[var(--text-soft)] max-w-xl mx-auto">যেকোনো কোর্স শুরু করার আগে বিনামূল্যে ঝলক দেখে নিন।</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {freeDemoCourses.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group bg-white dark:bg-[var(--surface-dark-card)] rounded-2xl p-6 border border-[var(--line)] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold px-3 py-1 rounded-md bg-[var(--sage-light)] text-[var(--sage)]">{c.category}</span>
                  <div className="flex items-center gap-1 text-[var(--amber)]">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold text-[var(--text-ink)]">{c.rating}</span>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-xl bg-[var(--sage-light)] flex items-center justify-center text-[var(--sage)] mb-4 group-hover:bg-[var(--sage)] group-hover:text-white transition-colors">{c.icon}</div>

                <h3 className="font-semibold text-[var(--text-ink)] text-base leading-snug mb-3 min-h-[48px]">{c.title}</h3>

                <div className="flex items-center gap-1.5 text-sm text-[var(--text-soft)] mb-5">
                  <Users className="w-4 h-4 text-[var(--sage)]" />
                  <span>{c.students} শিক্ষার্থী</span>
                </div>

                <Link to="/courses" className="sand-btn-ghost w-full justify-center text-sm py-2.5 inline-flex items-center gap-1">
                  <PlayCircle className="w-4 h-4" /> ফ্রি শুরু করুন
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths & Career Tracks */}
      <section className="py-16 lg:py-24" style={{ backgroundImage: "linear-gradient(180deg, var(--cream) 0%, var(--sage-light) 100%)" }}>
        <div className="container-sand">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="sand-eyebrow mb-4">ক্যারিয়ার পথ</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-ink)] mb-4">আপনার দক্ষতা থেকে ক্যারিয়ার গড়ুন</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <BookOpen className="w-6 h-6" />, name: "ওয়েব ডেভেলপমেন্ট", desc: "১২০+ কোর্স, ৫০+ প্রজেক্ট" },
              { icon: <Palette className="w-6 h-6" />, name: "ইউআই/ইউএক্স", desc: "৬০+ কোর্স, পোর্টফোলিও" },
              { icon: <Database className="w-6 h-6" />, name: "ডেটা সায়েন্স", desc: "৯০+ কোর্স, বাস্তব বিশ্লেষণ" },
              { icon: <BarChart3 className="w-6 h-6" />, name: "ডিজিটাল মার্কেটিং", desc: "৭০+ কোর্স, ক্যাম্পেইন" },
            ].map((p, i) => (
              <div
                key={i}
                className="sand-card p-5 text-center cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all"
                onClick={() => alert(p.name + ' পাথ')}
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-[var(--sage)] flex items-center justify-center mb-3 text-white">{p.icon}</div>
                <h3 className="font-semibold text-[var(--text-ink)]">{p.name}</h3>
                <p className="text-xs text-[var(--text-soft)] mt-1">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
