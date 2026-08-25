import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("আপনার বার্তার জন্য ধন্যবাদ! আমরা শীঘ্রই যোগাযোগ করব।");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] dark:bg-[var(--surface-dark)] py-24">
      <div className="container-sand">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <span className="sand-eyebrow mb-4">যোগাযোগ</span>
          <h1 className="text-5xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-4 mt-4">আমাদের সাথে কথা বলুন</h1>
          <p className="text-xl text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">আমরা আপনার কথা শুনতে চাই। বার্তা পাঠান, আমরা যত তাড়াতাড়ি সম্ভব উত্তর দেব।</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-6">যোগাযোগের তথ্য</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-1">ইমেইল</h3>
                    <p className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">support@altrion.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-1">ফোন</h3>
                    <p className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">+৮৮ ০১৭১২-৩৪৫৬৭৮</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-1">ঠিকানা</h3>
                    <p className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">১২৩ লার্নিং স্ট্রিট<br />এডুকেশন সিটি</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="sand-card p-6">
              <h3 className="font-semibold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-2">কাজের সময়</h3>
              <p className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] text-sm">সোম - শুক্র: সকাল ৯:০০ - বিকাল ৬:০০<br />শনি: সকাল ১০:০০ - দুপুর ৪:০০<br />রবি: বন্ধ</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="sand-card p-8">
              <h2 className="text-2xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-6 flex items-center space-x-2">
                <MessageSquare className="w-6 h-6 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]" />
                <span>আমাদের বার্তা পাঠান</span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-2">নাম</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="sand-input" placeholder="আপনার নাম" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-2">ইমেইল</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="sand-input" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-2">বিষয়</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="sand-input" placeholder="কী নিয়ে কথা?" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-2">বার্তা</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} className="sand-input resize-none" placeholder="আপনার বার্তা..." />
                </div>
                <button type="submit" disabled={loading} className="w-full sand-btn disabled:opacity-50">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>পাঠানো হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>বার্তা পাঠান</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
