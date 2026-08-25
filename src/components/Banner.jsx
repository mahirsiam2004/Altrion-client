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
    <section className="relative overflow-hidden" style={{ background: "#F7F4ED" }}>
      <style jsx global>{`
        :root {
          --sage: #8FA28A;
          --sage-light: #C7D3C0;
          --cream: #F7F4ED;
          --amber: #C8A96B;
        }
        .hero-sage { color: #8FA28A; }
        .hero-sage-bg { background: #8FA28A; }
        .hero-sage-light { background: #C7D3C0; }
        .hero-cream { background: #F7F4ED; }
        .hero-amber { background: #C8A96B; color: #fff; }
        .hero-amber:hover { background: #b89860; }
        .hero-amber-text { color: #C8A96B; }
        .hero-sage-text { color: #8FA28A; }
        .hero-cream-text { color: #F7F4ED; }
        .hero-ink { color: #1a1a1a; }
      `}</style>

      {/* soft background washes */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full hero-sage-light opacity-30 blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-[560px] h-[560px] rounded-full hero-sage opacity-20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full hero-amber opacity-15 blur-3xl" />
      </div>

      <div className="relative container-sand grid lg:grid-cols-2 gap-16 items-center pt-28 pb-32">
        {/* LEFT — Bangla copy */}
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 28 }} transition={{ duration: 0.7, ease: "easeOut" }}>
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full hero-sage-light hero-sage-text text-sm font-semibold mb-7">
            <Sparkles className="w-4 h-4" />
            <span>নতুন সিজনের কোর্স এসেছে</span>
          </div>

          <h1 className="text-5xl lg:text-[4.25rem] font-bold hero-ink leading-[1.08] tracking-tight">
            আপনার শেখার
            <span className="block hero-sage-text">যাত্রা শুরু করুন</span>
          </h1>

          <p className="mt-7 text-lg text-gray-600 max-w-xl leading-relaxed">
            Altrion-এর সাথে গুণমানসম্পন্ন কোর্স ও দক্ষ প্রশিক্ষক দিয়ে আপনার দক্ষতা বাড়ান। আজই যোগ দিন হাজারো শিক্ষার্থীর কমিউনিটিতে।
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link to="/courses">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="hero-amber px-8 py-3.5 rounded-xl font-semibold text-base flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all">
                <span>কোর্স দেখুন</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/about">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="border-2 border-sage-light text-sage px-8 py-3.5 rounded-xl font-semibold text-base flex items-center space-x-2 hover:bg-sage-light transition-all">
                <PlayCircle className="w-5 h-5" />
                <span>আমাদের জানুন</span>
              </motion.button>
            </Link>
          </div>

          {/* stats row */}
          <div className="mt-12 flex items-center gap-10">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 14 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 14 }} transition={{ delay: 0.3 + i * 0.1 }} className="text-center">
                <div className="hero-sage-text mb-1 flex justify-center">{s.icon}</div>
                <div className="text-2xl font-bold hero-ink">{s.value}</div>
                <div className="text-xs text-gray-500 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* social proof */}
          <div className="mt-9 flex items-center space-x-3">
            <div className="flex -space-x-3">
              {["https://i.pravatar.cc/80?img=11","https://i.pravatar.cc/80?img=32","https://i.pravatar.cc/80?img=47","https://i.pravatar.cc/80?img=60"].map((src,i)=>(
                <img key={i} src={src} alt="" className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-md" />
              ))}
            </div>
            <div className="flex items-center space-x-1 hero-amber-text">
              {[0,1,2,3,4].map(i=><Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <span className="text-sm text-gray-400">১০,০০০+ শিক্ষার্থীর বিশ্বস্ত পছন্দ</span>
          </div>
        </motion.div>

        {/* RIGHT — image + floating cards */}
        <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: mounted ? 1 : 0, scale: mounted ? 1 : 0.95, y: mounted ? 0 : 20 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative">
          <div className="hero-cream rounded-3xl overflow-hidden shadow-2xl border border-sage-light/50">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000"
              alt="শিক্ষার্থীরা একসাথে শিখছে"
              className="w-full h-[460px] object-cover"
              onError={(e)=>{e.target.src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg";}}
            />
          </div>

          {/* floating: rating */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 16 }} transition={{ delay: 0.5 }} className="absolute top-6 -left-6 hidden sm:flex items-center space-x-3 hero-cream shadow-xl rounded-2xl px-5 py-4 border border-sage-light/50">
            <div className="flex items-center space-x-1 hero-amber-text">
              {[0,1,2,3,4].map(i=><Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
            <div>
              <div className="text-sm font-bold hero-ink">৪.৯ / ৫</div>
              <div className="text-xs text-gray-500">৮,২৪০ রিভিউ</div>
            </div>
          </motion.div>

          {/* floating: certificate */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 16 }} transition={{ delay: 0.65 }} className="absolute -bottom-7 -right-4 hidden sm:flex items-center space-x-3 hero-cream shadow-xl rounded-2xl px-5 py-4 border border-sage-light/50">
            <div className="w-12 h-12 rounded-full hero-sage-light flex items-center justify-center hero-sage-text"><Award className="w-6 h-6" /></div>
            <div>
              <div className="text-sm font-bold hero-ink">সার্টিফিকেট</div>
              <div className="text-xs text-gray-500">কোর্স শেষে পাবেন</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;