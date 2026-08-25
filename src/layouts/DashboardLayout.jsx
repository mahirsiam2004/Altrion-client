import React, { useState, useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, BookOpen, Plus, GraduationCap, User, LogOut, Menu, X, Settings, BarChart3, Shield, Users,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import ThemeToggle from "../components/ThemeToggle";
import { isAdmin } from "../utils/roleHelper";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("সফলভাবে লগ আউট করা হয়েছে!");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("লগ আউট করা যায়নি");
    }
  };

  const userIsAdmin = isAdmin(user);

  const userMenuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: "ড্যাশবোর্ড", path: "/dashboard" },
    { icon: <BookOpen className="w-5 h-5" />, label: "আমার কোর্স", path: "/dashboard/my-courses" },
    { icon: <GraduationCap className="w-5 h-5" />, label: "আমার শেখা", path: "/dashboard/my-enrolled-courses" },
    { icon: <Plus className="w-5 h-5" />, label: "কোর্স যোগ", path: "/dashboard/add-course" },
    { icon: <BarChart3 className="w-5 h-5" />, label: "সব কোর্স", path: "/courses" },
    { icon: <User className="w-5 h-5" />, label: "প্রোফাইল", path: "/dashboard/profile" },
  ];

  const adminMenuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: "অ্যাডমিন ড্যাশবোর্ড", path: "/dashboard/admin" },
    { icon: <BookOpen className="w-5 h-5" />, label: "কোর্স ম্যানেজ", path: "/dashboard/admin/courses" },
    { icon: <Users className="w-5 h-5" />, label: "ইউজার ম্যানেজ", path: "/dashboard/admin/users" },
    { icon: <Shield className="w-5 h-5" />, label: "ইউজার ড্যাশবোর্ড", path: "/dashboard", divider: true },
  ];

  const menuItems = userIsAdmin ? [...adminMenuItems, ...userMenuItems] : userMenuItems;

  return (
    <div className="min-h-screen bg-[var(--surface)] dark:bg-[var(--surface-dark)] flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? "280px" : "0px" }}
        className="fixed lg:static inset-y-0 left-0 z-50 bg-[var(--surface-card)] dark:bg-[var(--surface-dark-card)] border-r border-[var(--line)] dark:border-[var(--line-dark)] overflow-hidden transition-all duration-300"
      >
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-[var(--line)] dark:border-[var(--line-dark)] flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <BookOpen className="w-8 h-8 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]" />
              <span className="text-xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">Altrion</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-[var(--text-faint)] hover:text-[var(--text-ink)] dark:hover:text-[var(--text-dark-ink)]">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-4 border-b border-[var(--line)] dark:border-[var(--line-dark)]">
            <div className="flex items-center space-x-3">
              {user?.photoURL ? (
                <img src={user.photoURL} alt={user.displayName} className="w-12 h-12 rounded-full border-2 border-[var(--sand-almond-silk)]" onError={(e) => { e.target.src = "https://via.placeholder.com/48"; }} />
              ) : (
                <div className="w-12 h-12 rounded-full bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] flex items-center justify-center">
                  <User className="w-6 h-6 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-semibold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] truncate">{user?.displayName || "ব্যবহারকারী"}</p>
                  {userIsAdmin && (
                    <span className="px-2 py-0.5 bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] text-xs font-semibold rounded-full">অ্যাডমিন</span>
                  )}
                </div>
                <p className="text-xs text-[var(--text-faint)] dark:text-[var(--text-dark-faint)] truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {userIsAdmin && (
              <p className="text-xs font-semibold text-[var(--text-faint)] dark:text-[var(--text-dark-faint)] uppercase tracking-wider px-4 mb-2">অ্যাডমিন প্যানেল</p>
            )}
            {menuItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.divider && (
                  <div className="my-4 border-t border-[var(--line)] dark:border-[var(--line-dark)]">
                    <p className="text-xs font-semibold text-[var(--text-faint)] dark:text-[var(--text-dark-faint)] uppercase tracking-wider px-4 mt-4 mb-2">ইউজার প্যানেল</p>
                  </div>
                )}
                <Link to={item.path} className="flex items-center space-x-3 px-4 py-3 rounded-xl text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] hover:bg-[var(--sand-linen)] dark:hover:bg-[var(--surface-dark-soft)] hover:text-[var(--sand-accent-strong)] dark:hover:text-[var(--sand-almond-silk)] transition-colors group">
                  <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              </React.Fragment>
            ))}
          </nav>

          <div className="p-4 border-t border-[var(--line)] dark:border-[var(--line-dark)] space-y-2">
            <div className="flex items-center justify-between px-4 py-2">
              <span className="text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">থিম</span>
              <ThemeToggle />
            </div>
            <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] hover:bg-[var(--sand-linen)] dark:hover:bg-[var(--surface-dark-soft)] transition-colors">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">লগ আউট</span>
            </button>
          </div>
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-[var(--surface-card)] dark:bg-[var(--surface-dark-card)] border-b border-[var(--line)] dark:border-[var(--line-dark)] px-4 py-4 lg:px-6">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] hover:text-[var(--text-ink)] dark:hover:text-[var(--text-dark-ink)]">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex-1"></div>
            <Link to="/" className="px-4 py-2 text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] hover:text-[var(--text-ink)] dark:hover:text-[var(--text-dark-ink)] transition-colors">হোমে ফিরুন</Link>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
