import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import { User, Mail, Image as ImageIcon, Shield, Save, LogOut } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { user, updateUserProfile, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", photoURL: "" });

  useEffect(() => {
    if (user) setFormData({ name: user.displayName || "", photoURL: user.photoURL || "" });
  }, [user]);

  if (!user) return null;

  const { email, emailVerified, metadata } = user;
  const creationTime = metadata?.creationTime ? new Date(metadata.creationTime).toLocaleDateString() : "—";

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData.name, formData.photoURL);
      toast.success("প্রোফাইল আপডেট করা হয়েছে!");
      setEditMode(false);
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error("প্রোফাইল আপডেট করা যায়নি");
    }
  };

  const handleLogout = async () => {
    try { await logout(); toast.success("লগ আউট সফল!"); navigate("/"); }
    catch { toast.error("লগ আউট সমস্যা"); }
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] dark:bg-[var(--surface-dark)] py-12">
      <div className="container-sand max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="sand-card overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-[var(--sand-almond-silk)] to-[var(--sand-accent)]" />
          <div className="px-8 pb-8">
            <div className="-mt-14 mb-6">
              <img src={user.photoURL} alt={user.displayName} className="w-28 h-28 rounded-full border-4 border-[var(--surface-card)] dark:border-[var(--surface-dark-card)] object-cover shadow-md" onError={(e)=>{e.target.src="https://via.placeholder.com/112";}} />
            </div>

            <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">{user.displayName}</h1>
                <p className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mt-1">{user.email}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${emailVerified ? "bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]" : "bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] text-[var(--text-faint)]"}`}>
                {emailVerified ? "ভেরিফায়েড" : "অভিজ্ঞতা যাচাই হয়নি"}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-[var(--surface-soft)] dark:bg-[var(--surface-dark-soft)] rounded-xl p-4">
                <div className="flex items-center space-x-2 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] mb-1"><Mail className="w-4 h-4" /><span className="text-xs font-semibold">ইমেইল</span></div>
                <p className="text-sm text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] truncate">{email}</p>
              </div>
              <div className="bg-[var(--surface-soft)] dark:bg-[var(--surface-dark-soft)] rounded-xl p-4">
                <div className="flex items-center space-x-2 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] mb-1"><Shield className="w-4 h-4" /><span className="text-xs font-semibold">যোগদান</span></div>
                <p className="text-sm text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">{creationTime}</p>
              </div>
              <div className="bg-[var(--surface-soft)] dark:bg-[var(--surface-dark-soft)] rounded-xl p-4">
                <div className="flex items-center space-x-2 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] mb-1"><User className="w-4 h-4" /><span className="text-xs font-semibold">স্ট্যাটাস</span></div>
                <p className="text-sm text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">সক্রিয়</p>
              </div>
            </div>

            {editMode ? (
              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-2">নাম</label>
                  <div className="relative"><User className="absolute left-3 top-3 w-5 h-5 text-[var(--text-faint)]" /><input type="text" name="name" value={formData.name} onChange={handleChange} className="sand-input pl-10" /></div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-2">ছবির লিংক</label>
                  <div className="relative"><ImageIcon className="absolute left-3 top-3 w-5 h-5 text-[var(--text-faint)]" /><input type="url" name="photoURL" value={formData.photoURL} onChange={handleChange} className="sand-input pl-10" /></div>
                </div>
                <div className="flex gap-3">
                  <button type="submit" className="sand-btn flex items-center space-x-2"><Save className="w-5 h-5" /><span>সেভ করুন</span></button>
                  <button type="button" onClick={() => setEditMode(false)} className="px-5 py-3 border border-[var(--line-strong)] dark:border-[var(--line-dark-strong)] rounded-xl text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">বাতিল</button>
                </div>
              </form>
            ) : (
              <div className="flex gap-3">
                <button onClick={() => setEditMode(true)} className="sand-btn flex items-center space-x-2"><User className="w-5 h-5" /><span>প্রোফাইল এডিট</span></button>
                <button onClick={handleLogout} className="px-5 py-3 bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] rounded-xl hover:opacity-80 flex items-center space-x-2"><LogOut className="w-5 h-5" /><span>লগ আউট</span></button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MyProfile;
