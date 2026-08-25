import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, DollarSign, Clock, Image, Tag, FileText, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { coursesAPI } from "../services/api";

const AddCourse = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "", imageURL: "", price: "", duration: "", category: "", description: "", isFeatured: false,
  });

  const categories = ["ওয়েব ডেভেলপমেন্ট", "মোবাইল ডেভেলপমেন্ট", "ডেটা সায়েন্স", "মেশিন লার্নিং", "UI/UX ডিজাইন", "ডিজিটাল মার্কেটিং", "বিজনেস", "ফটোগ্রাফি"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) { toast.error("কোর্স যোগ করতে লগ ইন প্রয়োজন"); navigate("/signin"); return; }
    setLoading(true);
    try {
      const courseData = { ...formData, price: parseFloat(formData.price), instructor: { name: user.displayName, email: user.email, photo: user.photoURL } };
      await coursesAPI.createCourse(courseData);
      toast.success("কোর্স সফলভাবে যোগ করা হয়েছে!");
      navigate("/dashboard/my-courses");
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error(error.response?.data?.message || "কোর্স যোগ করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] dark:bg-[var(--surface-dark)] py-12">
      <div className="container-sand max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="sand-card p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-2">নতুন কোর্স যোগ</h1>
            <p className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">আপনার জ্ঞান বিশ্বের সাথে শেয়ার করুন</p>
          </div>

          <div className="mb-8 p-4 bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] rounded-xl border border-[var(--sand-almond-silk)]">
            <p className="text-sm text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] font-semibold mb-2">প্রশিক্ষকের তথ্য (অটো-ফিল)</p>
            <div className="flex items-center space-x-3">
              <img src={user?.photoURL || "https://via.placeholder.com/48"} alt={user?.displayName} className="w-12 h-12 rounded-full object-cover" onError={(e)=>{e.target.src="https://via.placeholder.com/48";}} />
              <div>
                <p className="font-semibold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">{user?.displayName}</p>
                <p className="text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">{user?.email}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-2">কোর্সের শিরোনাম *</label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-3 w-5 h-5 text-[var(--text-faint)]" />
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="sand-input pl-10" placeholder="যেমন: সম্পূর্ণ ওয়েব ডেভেলপমেন্ট বুটক্যাম্প" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-2">ছবির লিংক *</label>
              <div className="relative">
                <Image className="absolute left-3 top-3 w-5 h-5 text-[var(--text-faint)]" />
                <input type="url" name="imageURL" value={formData.imageURL} onChange={handleChange} className="sand-input pl-10" placeholder="https://example.com/image.jpg" required />
              </div>
              <p className="text-xs text-[var(--text-faint)] dark:text-[var(--text-dark-faint)] mt-1">টিপস: imgbb.com-এ আপলোড করে সরাসরি লিংক পেস্ট করুন</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-2">মূল্য (USD) *</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-5 h-5 text-[var(--text-faint)]" />
                  <input type="number" name="price" value={formData.price} onChange={handleChange} className="sand-input pl-10" placeholder="৯৯.৯৯" step="0.01" min="0" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-2">সময়কাল *</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 w-5 h-5 text-[var(--text-faint)]" />
                  <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="sand-input pl-10" placeholder="যেমন: ৮ সপ্তাহ, ২০ ঘণ্টা" required />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-2">বিষয় *</label>
              <div className="relative">
                <Tag className="absolute left-3 top-3 w-5 h-5 text-[var(--text-faint)]" />
                <select name="category" value={formData.category} onChange={handleChange} className="sand-input pl-10" required>
                  <option value="">বিষয় বাছাই করুন</option>
                  {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-2">বিবরণ *</label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-[var(--text-faint)]" />
                <textarea name="description" value={formData.description} onChange={handleChange} rows="5" className="sand-input pl-10 resize-none" placeholder="শিক্ষার্থীরা এই কোর্স থেকে কী শিখবে বর্ণনা করুন..." required></textarea>
              </div>
            </div>

            <div className="flex items-center">
              <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-4 h-4 text-[var(--sand-accent)] rounded focus:ring-[var(--sand-accent)]" />
              <label className="ml-2 text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">বিশেষ কোর্স হিসেবে চিহ্নিত করুন</label>
            </div>

            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sand-btn disabled:opacity-50">
              {loading ? "যোগ করা হচ্ছে..." : <><CheckCircle className="w-5 h-5" /><span>কোর্স যোগ করুন</span></>}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddCourse;
