import React, { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, DollarSign, Clock, Image, Tag, FileText, CheckCircle } from "lucide-react";
import { coursesAPI } from "../services/api";
import Swal from "sweetalert2";

const UpdateCourse = () => {
  const course = useLoaderData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: course.title || "", imageURL: course.imageURL || "", price: course.price || "",
    duration: course.duration || "", category: course.category || "", description: course.description || "",
    isFeatured: course.isFeatured || false,
  });

  const categories = ["ওয়েব ডেভেলপমেন্ট", "মোবাইল ডেভেলপমেন্ট", "ডেটা সায়েন্স", "মেশিন লার্নিং", "UI/UX ডিজাইন", "ডিজিটাল মার্কেটিং", "বিজনেস", "ফটোগ্রাফি"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedData = { ...formData, price: parseFloat(formData.price), instructor: course.instructor };
      await coursesAPI.updateCourse(course._id, updatedData);
      Swal.fire({ title: "কোর্স আপডেট হয়েছে!", text: "আপনার কোর্স সফলভাবে আপডেট করা হয়েছে।", icon: "success", confirmButtonColor: "#b08968", confirmButtonText: "আমার কোর্সে যান" }).then(() => navigate("/dashboard/my-courses"));
    } catch (error) {
      console.error("Error updating course:", error);
      Swal.fire({ title: "ত্রুটি!", text: error.response?.data?.message || "কোর্স আপডেট করা যায়নি।", icon: "error", confirmButtonColor: "#d33" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] dark:bg-[var(--surface-dark)] py-12">
      <div className="container-sand max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="sand-card p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-2">কোর্স আপডেট</h1>
            <p className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">আপনার কোর্সের বিবরণ এডিট করুন</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-2">কোর্সের শিরোনাম *</label>
              <div className="relative"><BookOpen className="absolute left-3 top-3 w-5 h-5 text-[var(--text-faint)]" /><input type="text" name="title" value={formData.title} onChange={handleChange} className="sand-input pl-10" required /></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-2">ছবির লিংক *</label>
              <div className="relative"><Image className="absolute left-3 top-3 w-5 h-5 text-[var(--text-faint)]" /><input type="url" name="imageURL" value={formData.imageURL} onChange={handleChange} className="sand-input pl-10" required /></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-2">মূল্য (USD) *</label>
                <div className="relative"><DollarSign className="absolute left-3 top-3 w-5 h-5 text-[var(--text-faint)]" /><input type="number" name="price" value={formData.price} onChange={handleChange} className="sand-input pl-10" step="0.01" min="0" required /></div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-2">সময়কাল *</label>
                <div className="relative"><Clock className="absolute left-3 top-3 w-5 h-5 text-[var(--text-faint)]" /><input type="text" name="duration" value={formData.duration} onChange={handleChange} className="sand-input pl-10" required /></div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-2">বিষয় *</label>
              <div className="relative"><Tag className="absolute left-3 top-3 w-5 h-5 text-[var(--text-faint)]" />
                <select name="category" value={formData.category} onChange={handleChange} className="sand-input pl-10" required>
                  <option value="">বিষয় বাছাই করুন</option>
                  {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-2">বিবরণ *</label>
              <div className="relative"><FileText className="absolute left-3 top-3 w-5 h-5 text-[var(--text-faint)]" /><textarea name="description" value={formData.description} onChange={handleChange} rows="5" className="sand-input pl-10 resize-none" required></textarea></div>
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-4 h-4 text-[var(--sand-accent)] rounded focus:ring-[var(--sand-accent)]" />
              <label className="ml-2 text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">বিশেষ কোর্স হিসেবে চিহ্নিত করুন</label>
            </div>
            <div className="flex gap-4 pt-4">
              <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1 sand-btn disabled:opacity-50">{loading ? "আপডেট হচ্ছে..." : <><CheckCircle className="w-5 h-5" /><span>কোর্স আপডেট</span></>}</motion.button>
              <button type="button" onClick={() => navigate("/dashboard/my-courses")} className="px-6 py-3 border border-[var(--line-strong)] dark:border-[var(--line-dark-strong)] text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] rounded-xl hover:bg-[var(--surface-soft)] dark:hover:bg-[var(--surface-dark-soft)] font-semibold transition-colors">বাতিল</button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UpdateCourse;
