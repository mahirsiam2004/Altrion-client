import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

export const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const { signIn, signInWithGoogle, resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("দয়া করে সব ফিল্ড পূরণ করুন");
      return;
    }
    setLoading(true);
    try {
      await signIn(formData.email, formData.password);
      toast.success("সফলভাবে লগ ইন হয়েছে!");
      navigate(from, { replace: true });
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      let errorMessage = "লগ ইন ব্যর্থ। আবার চেষ্টা করুন।";
      if (error.code === "auth/invalid-credential") errorMessage = "ইমেইল বা পাসওয়ার্ড ভুল।";
      else if (error.code === "auth/user-not-found") errorMessage = "এই ইমেইলে কোনো অ্যাকাউন্ট নেই।";
      else if (error.code === "auth/wrong-password") errorMessage = "পাসওয়ার্ড ভুল।";
      else if (error.code === "auth/too-many-requests") errorMessage = "অনেকবার চেষ্টা করা হয়েছে। পরে আবার চেষ্টা করুন।";
      toast.error(errorMessage);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success("গুগল দিয়ে লগ ইন সফল!");
      navigate(from, { replace: true });
    } catch (error) {
      setLoading(false);
      console.error("Google login error:", error);
      let errorMessage = "গুগল লগ ইন ব্যর্থ।";
      if (error.code === "auth/popup-closed-by-user") errorMessage = "লগ ইন বাতিল করা হয়েছে।";
      toast.error(errorMessage);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.error("দয়া করে আপনার ইমেইল দিন");
      return;
    }
    try {
      await resetPassword(resetEmail);
      toast.success("পাসওয়ার্ড রিসেট ইমেইল পাঠানো হয়েছে! ইনবক্স চেক করুন।");
      setShowReset(false);
      setResetEmail("");
    } catch (error) {
      console.error("Reset error:", error);
      if (error.code === "auth/user-not-found") toast.error("এই ইমেইলে কোনো অ্যাকাউন্ট নেই।");
      else toast.error("রিসেট ইমেইল পাঠানো যায়নি।");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface-soft)] dark:bg-[var(--surface-dark-soft)] py-12 px-4">
      <div className="max-w-md w-full sand-card p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">ফিরে আসার অভিনন্দন</h2>
          <p className="mt-2 text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">
            শেখা চালিয়ে যেতে লগ ইন করুন
          </p>
        </div>

        {!showReset ? (
          <>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-1">ইমেইল</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-[var(--text-faint)]" />
                  <input name="email" type="email" value={formData.email} onChange={handleChange}
                    className="sand-input pl-10" placeholder="you@example.com" required />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-1">পাসওয়ার্ড</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-[var(--text-faint)]" />
                  <input name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleChange}
                    className="sand-input pl-10 pr-12" placeholder="পাসওয়ার্ড লিখুন" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-[var(--text-faint)]">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <button type="button" onClick={() => setShowReset(true)} className="text-sm text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] hover:opacity-80">
                  পাসওয়ার্ড ভুলে গেছেন?
                </button>
              </div>

              <button type="submit" disabled={loading} className="w-full sand-btn disabled:opacity-50">
                {loading ? "লগ ইন হচ্ছে..." : "লগ ইন"}
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

            <button type="button" onClick={handleGoogleLogin} disabled={loading}
              className="w-full flex items-center justify-center gap-3 border border-[var(--line-strong)] dark:border-[var(--line-dark-strong)] py-2 rounded-full hover:bg-[var(--surface-soft)] dark:hover:bg-[var(--surface-dark-soft)] disabled:opacity-50 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              গুগল দিয়ে লগ ইন
            </button>

            <div className="mt-4 p-3 bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] border border-[var(--sand-almond-silk)] rounded-xl">
              <p className="text-xs text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] font-semibold mb-1">
                অ্যাডমিন অ্যাক্সেস টিপস:
              </p>
              <p className="text-xs text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">
                অ্যাডমিন প্যানেলে যেতে এমন ইমেইল দিয়ে সাইন আপ করুন যাতে "admin" আছে (যেমন admin@test.com) অথবা গুগল দিয়ে লগ ইন করুন।
              </p>
            </div>

            <p className="text-center text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mt-6">
              অ্যাকাউন্ট নেই?{" "}
              <Link to="/signup" className="text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] font-medium hover:opacity-80">
                রেজিস্টার করুন
              </Link>
            </p>
          </>
        ) : (
          <>
            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-1">ইমেইল</label>
                <input type="email" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)}
                  className="sand-input" placeholder="আপনার ইমেইল" required />
              </div>
              <button type="submit" className="w-full sand-btn">রিসেট লিংক পাঠান</button>
              <button type="button" onClick={() => setShowReset(false)} className="w-full text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] py-2">
                লগ ইনে ফিরুন
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Signin;
