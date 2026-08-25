import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";

const Blog = () => {
  const blogPosts = [
    { id: 1, title: "কার্যকর অনলাইন শেখার ১০ টি টিপস", excerpt: "অনলাইন শেখার অভিজ্ঞতা সর্বোচ্চ করতে প্রমাণিত কৌশলগুলো জানুন।", author: "সারা জohnson", date: "মার্চ ১৫, ২০২৪", category: "শেখার টিপস", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800" },
    { id: 2, title: "অনলাইন শিক্ষার ভবিষ্যৎ", excerpt: "প্রযুক্তি কীভাবে শিক্ষার দৃশ্যপট বদলে দিচ্ছে তা অন্বেষণ করুন।", author: "মাইকেল চেন", date: "মার্চ ১০, ২০২৪", category: "ইন্ডাস্ট্রি", image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800" },
    { id: 3, title: "টেকে ক্যারিয়ার গড়ার সম্পূর্ণ গাইড", excerpt: "টেক ইন্ডাস্ট্রিতে শুরু ও এগিয়ে যাওয়ার বিস্তারিত গাইড।", author: "এমিলি ডেভিস", date: "মার্চ ৫, ২০২৪", category: "ক্যারিয়ার", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800" },
  ];

  return (
    <div className="min-h-screen bg-[var(--surface)] dark:bg-[var(--surface-dark)] py-24">
      <div className="container-sand">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="sand-eyebrow mb-4">ব্লগ</span>
          <h1 className="text-5xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-4 mt-4">আমাদের ব্লগ</h1>
          <p className="text-xl text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">অনলাইন শেখার জগত থেকে অন্তর্দৃষ্টি, টিপস ও আপডেট</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article key={post.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="sand-card overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e)=>{e.target.src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg";}} />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[var(--sand-accent)] text-white text-xs font-semibold rounded-full">{post.category}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 text-sm text-[var(--text-faint)] dark:text-[var(--text-dark-faint)] mb-4">
                  <div className="flex items-center space-x-1"><Calendar className="w-4 h-4" /><span>{post.date}</span></div>
                  <div className="flex items-center space-x-1"><User className="w-4 h-4" /><span>{post.author}</span></div>
                </div>
                <h2 className="text-xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-3 group-hover:text-[var(--sand-accent-strong)] dark:group-hover:text-[var(--sand-almond-silk)] transition-colors">{post.title}</h2>
                <p className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-4 line-clamp-3">{post.excerpt}</p>
                <Link to="/" className="inline-flex items-center space-x-2 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] font-semibold hover:opacity-80 transition-colors">
                  <span>আরও পড়ুন</span><ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 bg-gradient-to-r from-[var(--sand-almond-silk)] to-[var(--sand-accent)] rounded-3xl p-8 text-center">
          <BookOpen className="w-12 h-12 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">আমাদের লেখার আপডেট পান</h2>
          <p className="text-white/90 mb-6">নিউজলেটারে সাবস্ক্রাইব করুন, কোনো আপডেট মিস করবেন না</p>
          <Link to="/"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-3 bg-white text-[var(--sand-accent-strong)] rounded-full font-semibold hover:shadow-xl transition-all">এখনই সাবস্ক্রাইব করুন</motion.button></Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
