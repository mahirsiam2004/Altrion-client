import React, { useState } from "react";
import { motion } from "framer-motion";
import { HelpCircle, ChevronDown, BookOpen, Mail, MessageSquare, Search, Video, FileText } from "lucide-react";

const Help = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  const faqs = [
    { question: "আমি কীভাবে কোর্সে এনরোল করব?", answer: "কোর্সে এনরোল করতে আমাদের কোর্স ক্যাটালগ ব্রাউজ করুন, আপনার পছন্দের কোর্সে ক্লিক করুন ও 'এনরোল করুন' বাটনে চাপ দিন। এনরোল করতে লগ ইন থাকতে হবে।" },
    { question: "আমি কি রিফান্ড পাব?", answer: "হ্যাঁ, আমরা ৩০ দিনের মানি-ব্যাক গ্যারান্টি দিই। কেনাকাটিতে সন্তুষ্ট না হলে ৩০ দিনের মধ্যে সাপোর্ট টিমের সাথে যোগাযোগ করলে ফুল রিফান্ড পাবেন।" },
    { question: "একবার এনরোল করলে কতদিন অ্যাক্সেস থাকবে?", answer: "এনরোল করার পর আপনি কোর্স ম্যাটেরিয়ালে লাইফটাইম অ্যাক্সেস পাবেন, ভবিষ্যতের আপডেটসহ।" },
    { question: "কি সার্টিফিকেট দেওয়া হয়?", answer: "হ্যাঁ, কোর্স সফলভাবে শেষ করলে আপনি একটি সার্টিফিকেট পাবেন যা লিংকডইন বা রেজুমেতে যোগ করতে পারবেন।" },
    { question: "মোবাইলে কোর্স দেখা যাবে?", answer: "অবশ্যই! আমাদের প্ল্যাটফর্ম সম্পূর্ণ রেস্পন্সিভ — মোবাইল, ট্যাবলেট ও ডেস্কটপে সহজেই কাজ করে।" },
    { question: "কী পেমেন্ট মেথড গ্রহণ করা হয়?", answer: "আমরা সব প্রধান ক্রেডিট ও ডেবিট কার্ড এবং পেপাল গ্রহণ করি। কিছু কোর্স ফ্রিও আছে।" },
  ];

  const helpCategories = [
    { icon: <BookOpen className="w-8 h-8" />, title: "শুরু করুন", description: "প্ল্যাটফর্ম ব্যবহারের মৌলিক বিষয়", link: "#" },
    { icon: <Video className="w-8 h-8" />, title: "কোর্স কন্টেন্ট", description: "কোর্স ম্যাটেরিয়াল ও ভিডিও নিয়ে প্রশ্ন", link: "#" },
    { icon: <FileText className="w-8 h-8" />, title: "সার্টিফিকেট", description: "কোর্স সার্টিফিকেট সম্পর্কিত তথ্য", link: "#" },
    { icon: <Mail className="w-8 h-8" />, title: "অ্যাকাউন্ট ও বিলিং", description: "অ্যাকাউন্ট ও পেমেন্ট ম্যানেজ করুন", link: "#" },
  ];

  const filteredFaqs = faqs.filter((f) =>
    f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--surface)] dark:bg-[var(--surface-dark)] py-24">
      <div className="container-sand">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="sand-eyebrow mb-4">সাহায্য</span>
          <h1 className="text-5xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-4 mt-4">আমরা কীভাবে সাহায্য করতে পারি?</h1>
          <p className="text-xl text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">সাধারণ প্রশ্নের উত্তর খুঁজুন বা আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-faint)]" />
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="সাহায্য খুঁজুন..." className="sand-input pl-12" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {helpCategories.map((category, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="sand-card p-6 text-center cursor-pointer hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] rounded-2xl flex items-center justify-center text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] mx-auto mb-4">{category.icon}</div>
              <h3 className="text-lg font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-2">{category.title}</h3>
              <p className="text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">{category.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-4 flex items-center justify-center space-x-2">
              <HelpCircle className="w-8 h-8 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]" />
              <span>সাধারণ জিজ্ঞাসা</span>
            </h2>
          </motion.div>
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="sand-card overflow-hidden">
                <button onClick={() => toggleFaq(index)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[var(--surface-soft)] dark:hover:bg-[var(--surface-dark-soft)] transition-colors">
                  <span className="font-semibold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-[var(--text-faint)] transition-transform ${openFaq === index ? "rotate-180" : ""}`} />
                </button>
                {openFaq === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-4 text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
            {filteredFaqs.length === 0 && (
              <p className="text-center text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] py-8">কোনো ফলাফল পাওয়া যায়নি।</p>
            )}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 bg-gradient-to-r from-[var(--sand-almond-silk)] to-[var(--sand-accent)] rounded-3xl p-8 text-center">
          <MessageSquare className="w-12 h-12 text-white mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-4">এখনো সাহায্য প্রয়োজন?</h2>
          <p className="text-white/90 mb-6">আমাদের সাপোর্ট টিম ২৪/৭ আপনার পাশে আছে</p>
          <a href="/contact"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-3 bg-white text-[var(--sand-accent-strong)] rounded-full font-semibold hover:shadow-xl transition-all">সাপোর্টের সাথে যোগাযোগ</motion.button></a>
        </motion.div>
      </div>
    </div>
  );
};

export default Help;
