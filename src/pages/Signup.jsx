import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Image } from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", photoURL: "", password: "" });
  const [loading, setLoading] = useState(false);

  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePassword = (password) => {
    if (password.length < 6) return "পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে";
    if (!/[A-Z]/.test(password)) return "পাসওয়ার্ডে কমপক্ষে একটি বড় হাতের অক্ষর থাকতে হবে";
    if (!/[a-z]/.test(password)) return "পাসওয়ার্ডে কমপক্ষে একটি ছোট হাতের অক্ষর থাকতে হবে";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.photoURL || !formData.password) {
      toast.error("দয়া করে সব ফিল্ড পূরণ করুন");
      return;
    }
    const passwordError = validatePassword(formData.password);
    if (passwordError) { toast.error(passwordError); return; }

    setLoading(true);
    try {
      await createUser(formData.email, formData.password);
      await updateUserProfile(formData.name, formData.photoURL);
      toast.success("রেজিস্ট্রেশন সফল!");
      navigate(from, { replace: true });
    } catch (error) {
      setLoading(false);
      console.error("Registration error:", error);
      let errorMessage = "রেজিস্ট্রেশন ব্যর্থ। আবার চেষ্টা করুন।";
      if (error.code === "auth/email-already-in-use") errorMessage = "এই ইমেইল ইতিমধ্যে ব্যবহৃত হয়েছে।";
      else if (error.code === "auth/invalid-email") errorMessage = "ইমেইল ঠিকানা ভুল।";
      else if (error.code === "auth/weak-password") errorMessage = "পাসওয়ার্ড খুব দুর্বল।";
      toast.error(errorMessage);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success("গুগল দিয়ে রেজিস্ট্রেশন সফল!");
      navigate(from, { replace: true });
    } catch (error) {
      setLoading(false);
      console.error("Google sign up error:", error);
      let errorMessage = "গুগল রেজিস্ট্রেশন ব্যর্থ।";
      if (error.code === "auth/popup-closed-by-user") errorMessage = "রেজিস্ট্রেশন বাতিল করা হয়েছে।";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface-soft)] dark:bg-[var(--surface-dark-soft)] py-12 px-4">
      <div className="max-w-md w-full sand-card p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">অ্যাকাউন্ট তৈরি করুন</h2>
          <p className="mt-2 text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">
            আজই যোগ দিন আর শেখা শুরু করুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-1">পূর্ণ নাম</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-[var(--text-faint)]" />
              <input name="name" type="text" value={formData.name} onChange={handleChange}
                className="sand-input pl-10" placeholder="আপনার নাম" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-1">ইমেইল</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-[var(--text-faint)]" />
              <input name="email" type="email" value={formData.email} onChange={handleChange}
                className="sand-input pl-10" placeholder="you@example.com" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-1">ছবির লিংক</label>
            <div className="relative">
              <Image className="absolute left-3 top-3 w-5 h-5 text-[var(--text-faint)]" />
              <input name="photoURL" type="url" value={formData.photoURL} onChange={handleChange}
                className="sand-input pl-10" placeholder="https://example.com/photo.jpg" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-1">পাসওয়ার্ড</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-[var(--text-faint)]" />
              <input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange}
                className="sand-input pl-10 pr-12" placeholder="পাসওয়ার্ড তৈরি করুন" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-[var(--text-faint)]">
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-[var(--text-faint)] mt-1">কমপক্ষে ৬ অক্ষর, ১ বড় + ১ ছোট হাতের অক্ষর</p>
          </div>

          <button type="submit" disabled={loading} className="w-full sand-btn disabled:opacity-50">
            {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--line)] dark:border-[var(--line-dark)]"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-[var(--surface-card)] dark:bg-[var(--surface-dark-card)] text-[var(--text-faint)]">অথবা</span>
          </div>
        </div>

        <button type="button" onClick={handleGoogleSignUp} disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-[var(--line-strong)] dark:border-[var(--line-dark-strong)] py-2 rounded-full hover:bg-[var(--surface-soft)] dark:hover:bg-[var(--surface-dark-soft)] disabled:opacity-50 transition-colors">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          গুগল দিয়ে রেজিস্টার
        </button>

        <div className="mt-4 p-3 bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] border border-[var(--sand-almond-silk)] rounded-xl">
          <p className="text-xs text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] font-semibold mb-1">
            অ্যাডমিন অ্যাক্সেস:
          </p>
          <p className="text-xs text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">
            "admin" আছে এমন ইমেইল (যেমন admin@test.com) দিয়ে রেজিস্টার করলে অ্যাডমিন প্যানেল পাবেন।
          </p>
        </div>

        <p className="text-center text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mt-6">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
          <Link to="/signin" className="text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] font-medium hover:opacity-80">
            লগ ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
