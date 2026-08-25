import React from "react";
import { motion } from "framer-motion";
import { Users, Award, Target, Heart, BookOpen, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-[var(--surface)] dark:bg-[var(--surface-soft)]">
      {/* Hero — darker sage gradient so white text has strong contrast */}
      <section
        className="text-white py-24"
        style={{ backgroundImage: "linear-gradient(135deg, #5b6e57 0%, #3d4d3a 100%)" }}
      >
        <div className="container-sand">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <h1 className="text-5xl font-bold mb-6">Altrion সম্পর্কে</h1>
            <p className="text-xl text-white/95 max-w-3xl mx-auto">
              গুণমানসম্পন্ন শিক্ষা আর উদ্ভাবনী কোর্সের মাধ্যমে শিক্ষার্থীদের ক্ষমতায়নে আমরা প্রতিশ্রুতিবদ্ধ
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-sand">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="sand-eyebrow mb-4">আমাদের লক্ষ্য</span>
              <h2 className="text-4xl font-bold text-[var(--text-ink)] dark:text-[var(--cream)] mb-6 mt-4">
                শিক্ষা হওয়া উচিত সহজ, আকর্ষণীয় ও রূপান্তরকারী
              </h2>
              <p className="text-lg text-[var(--text-soft)] dark:text-[var(--text-faint)] mb-4">
                Altrion-এ আমরা বিশ্বাস করি শিক্ষা সবার জন্য সুলভ, আনন্দদায়ক ও পরিবর্তনকারী হওয়া উচিত। আমাদের লক্ষ্য এমন অনলাইন কোর্স দেওয়া যা ব্যক্তিদের ক্যারিয়ার ও ব্যক্তিগত লক্ষ্য অর্জনে সাহায্য করে।
              </p>
              <p className="text-lg text-[var(--text-soft)] dark:text-[var(--text-faint)]">
                আমরা এমন পরিবেশ তৈরি করতে প্রতিশ্রুতিবদ্ধ যেখানে শিক্ষার্থীরা বড় হতে পারে, প্রশিক্ষকরা তাঁদের দক্ষতা ছড়িয়ে দিতে পারেন আর জ্ঞান মুক্তভাবে আদান-প্রদান হয়।
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div
                className="rounded-3xl p-12"
                style={{ backgroundImage: "linear-gradient(135deg, var(--sage-light) 0%, var(--cream) 100%)" }}
              >
                <Target className="w-24 h-24 text-[var(--sage)] mx-auto" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[var(--surface-soft)] dark:bg-[var(--surface-card)]">
        <div className="container-sand">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <span className="sand-eyebrow mb-4">আমাদের মূল্যবোধ</span>
            <h2 className="text-4xl font-bold text-[var(--text-ink)] dark:text-[var(--cream)] mb-4 mt-4">যা আমাদের চালায়</h2>
            <p className="text-lg text-[var(--text-soft)] dark:text-[var(--text-faint)]">যে নীতিগুলো আমাদের সব কিছুর ভিত্তি</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Heart className="w-12 h-12" />, title: "শেখার প্রতি ভালোবাসা", description: "আমরা শিক্ষার প্রতি আবেগশীল এবং শেখার রূপান্তরকারী শক্তিতে বিশ্বাস করি।" },
              { icon: <Award className="w-12 h-12" />, title: "উৎকর্ষতা", description: "আমরা প্রতিটি কোর্সে সেরা মানের কন্টেন্ট নিশ্চিত করতে চেষ্টা করি।" },
              { icon: <Users className="w-12 h-12" />, title: "কমিউনিটি", description: "আমরা এমন সহায়ক পরিবেশ গড়ে তুলি যেখানে সবাই উন্নতি করতে পারে।" },
            ].map((value, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="sand-card p-8 text-center">
                <div className="w-20 h-20 bg-[var(--sage-light)] dark:bg-[var(--sage)] rounded-2xl flex items-center justify-center text-[var(--sage)] dark:text-[var(--cream)] mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--text-ink)] dark:text-[var(--cream)] mb-3">{value.title}</h3>
                <p className="text-[var(--text-soft)] dark:text-[var(--text-faint)]">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-sand">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "৫০K+", label: "শিক্ষার্থী", icon: <Users className="w-8 h-8" /> },
              { number: "৫০০+", label: "কোর্স", icon: <BookOpen className="w-8 h-8" /> },
              { number: "২০০+", label: "প্রশিক্ষক", icon: <Award className="w-8 h-8" /> },
              { number: "৪.৯/৫", label: "রেটিং", icon: <TrendingUp className="w-8 h-8" /> },
            ].map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center">
                <div className="text-[var(--sage)] mb-4 flex justify-center">{stat.icon}</div>
                <div className="text-4xl font-bold text-[var(--text-ink)] dark:text-[var(--cream)] mb-2">{stat.number}</div>
                <div className="text-[var(--text-soft)] dark:text-[var(--text-faint)] font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-24"
        style={{ backgroundImage: "linear-gradient(135deg, var(--sage) 0%, var(--sage-dark) 100%)" }}
      >
        <div className="container-sand text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-white mb-4">শেখা শুরু করতে প্রস্তুত?</h2>
            <p className="text-xl text-white/90 mb-8">হাজারো শিক্ষার্থীর সাথে যোগ দিন তাঁদের শেখার যাত্রায়</p>
            <Link to="/courses">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-white text-[var(--sage)] rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all">
                কোর্স এক্সপ্লোর করুন
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
