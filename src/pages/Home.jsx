import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Banner from "../components/Banner";
import CourseCard from "../components/CourseCard";
import { Users, Award, BookOpen, TrendingUp, ArrowRight, Zap, Target, Rocket, Star } from "lucide-react";
import Showcase3D from "../components/Showcase3D";
import Review from "./Review";
import { coursesAPI } from "../services/api";
import { toast } from "react-toastify";

export const Home = () => {
  const [popularCourses, setPopularCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Altrion — শেখার নতুন আঙ্গিক";
    fetchFeaturedCourses();
  }, []);

  const fetchFeaturedCourses = async () => {
    try {
      setLoading(true);
      const featuredCourses = await coursesAPI.getFeaturedCourses();
      const coursesArray = Array.isArray(featuredCourses) ? featuredCourses : [];
      if (coursesArray.length === 0) {
        const allCourses = await coursesAPI.getAllCourses();
        const allCoursesArray = Array.isArray(allCourses) ? allCourses : [];
        setPopularCourses(allCoursesArray.slice(0, 6));
      } else {
        setPopularCourses(coursesArray);
      }
    } catch (error) {
      console.error("Error fetching featured courses:", error);
      setPopularCourses([]);
      toast.error("কোর্স লোড করা যায়নি");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[var(--surface)] dark:bg-[var(--surface-dark)]">

      <Banner />

      {/* Popular Courses */}
      <section className="py-24 bg-[var(--surface)] dark:bg-[var(--surface-dark)]">
        <div className="container-sand">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="sand-eyebrow mb-4">জনপ্রিয়</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-4 mt-4">
              আমাদের জনপ্রিয় কোর্সসমূহ
            </h2>
            <p className="text-lg text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] max-w-2xl mx-auto">
              সবচেয়ে বেশি পছন্দ করা কোর্সগুলো দেখুন আর আজই শেখা শুরু করুন
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--sand-accent)]"></div>
            </div>
          ) : popularCourses.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
                {popularCourses.map((course, index) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Link to="/courses" className="sand-btn text-lg">
                  <span>সব কোর্স দেখুন</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]" />
              </div>
              <h3 className="text-2xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-2">
                এখনো কোনো কোর্স নেই
              </h3>
              <p className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-6">
                প্রথম কোর্সটি যোগ করে শুরু করুন!
              </p>
              <Link to="/add-course" className="sand-btn">
                কোর্স যোগ করুন
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[var(--surface-soft)] dark:bg-[var(--surface-dark-soft)]">
        <div className="container-sand">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="sand-eyebrow mb-4">কেন Altrion</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-4 mt-4">
              কেন Altrion বেছে নেবেন?
            </h2>
            <p className="text-lg text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] max-w-2xl mx-auto">
              দক্ষ প্রশিক্ষক ও আধুনিক কন্টেন্টে আমরা দিচ্ছি সেরা শেখার অভিজ্ঞতা
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <BookOpen className="w-12 h-12" />, title: "৫০০+ কোর্স", description: "বিভিন্ন বিষয়ে বিশাল কোর্স সংগ্রহ", color: "bg-[var(--sand-almond-silk)]" },
              { icon: <Users className="w-12 h-12" />, title: "দক্ষ প্রশিক্ষক", description: "ইন্ডাস্ট্রির অভিজ্ঞ পেশাজীবীদের কাছ থেকে শিখুন", color: "bg-[var(--sand-accent)]" },
              { icon: <Award className="w-12 h-12" />, title: "সার্টিফিকেট", description: "শেষে পাবেন স্বীকৃত সার্টিফিকেট", color: "bg-[var(--sand-accent-strong)]" },
              { icon: <TrendingUp className="w-12 h-12" />, title: "ক্যারিয়ার গ্রোথ", description: "নতুন দক্ষতায় এগিয়ে নিন ক্যারিয়ার", color: "bg-[var(--sand-deep)]" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="sand-card p-8 text-center"
              >
                <div className={`${feature.color} w-20 h-20 rounded-2xl flex items-center justify-center text-white mb-6 mx-auto shadow-sm`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Showcase3D />
      <Review />

      {/* Top Instructors */}
      <section className="py-24 bg-[var(--surface)] dark:bg-[var(--surface-dark)]">
        <div className="container-sand">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="sand-eyebrow mb-4">প্রশিক্ষকবৃন্দ</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-4 mt-4">
              শীর্ষ প্রশিক্ষকরা
            </h2>
            <p className="text-lg text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] max-w-2xl mx-auto">
              ইন্ডাস্ট্রির সেরা মানুষদের কাছ থেকে শিখুন
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "জহিরুল ইসলাম", role: "ওয়েব ডেভেলপমেন্ট বিশেষজ্ঞ", image: "https://randomuser.me/api/portraits/men/32.jpg", courses: 25, students: 10500 },
              { name: "মাইকেল চেন", role: "ডেটা সায়েন্স গুরু", image: "https://randomuser.me/api/portraits/men/2.jpg", courses: 18, students: 8200 },
              { name: "এমিলি ডেভিস", role: "ইউআই/ইউএক্স ডিজাইনার", image: "https://randomuser.me/api/portraits/women/3.jpg", courses: 22, students: 9300 },
              { name: "ডেভিড উইলসন", role: "মোবাইল ডেভ বিশেষজ্ঞ", image: "https://randomuser.me/api/portraits/men/4.jpg", courses: 20, students: 7800 },
            ].map((instructor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="sand-card p-6 text-center"
              >
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-[var(--surface-card)] dark:border-[var(--surface-dark-card)] shadow-sm"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/96?text=I"; }}
                />
                <h3 className="text-xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-1">
                  {instructor.name}
                </h3>
                <p className="text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] font-semibold mb-4">
                  {instructor.role}
                </p>
                <div className="flex justify-center space-x-6 text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">
                  <div>
                    <p className="font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">{instructor.courses}</p>
                    <p>কোর্স</p>
                  </div>
                  <div>
                    <p className="font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">{instructor.students.toLocaleString()}</p>
                    <p>শিক্ষার্থী</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-[var(--sand-almond-silk)] to-[var(--sand-accent)]">
        <div className="container-sand text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Rocket className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              শেখার যাত্রা শুরু করতে প্রস্তুত?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              হাজারো শিক্ষার্থীর সাথে যোগ দিন যারা ইতিমধ্যে নিচ্ছে ক্যারিয়ারে পাল্টে দেওয়া কোর্স
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-white text-[var(--sand-accent-strong)] rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all">
                  কোর্স এক্সপ্লোর করুন
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                  ফ্রি রেজিস্টার করুন
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
