import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, BookOpen } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[var(--surface-soft)] dark:bg-[var(--surface-dark-soft)] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-2xl">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="mb-8">
          <h1 className="text-9xl font-bold text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]">৪০৪</h1>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <h2 className="text-4xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-4">
            পেজটি খুঁজে পাওয়া যায়নি
          </h2>
          <p className="text-lg text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-8">
            দুঃখিত! আপনি যে পেজটি খুঁজছেন তা নেই। হয়তো সরানো হয়েছে বা মোছা হয়েছে।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/" className="sand-btn">
                <Home className="w-5 h-5" />
                <span>হোমে যান</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button onClick={() => window.history.back()} className="sand-btn-ghost">
                <ArrowLeft className="w-5 h-5" />
                <span>ফিরে যান</span>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
