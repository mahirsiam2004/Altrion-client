import React, { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, BookOpen, LogOut, User, LayoutDashboard, GraduationCap } from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("সফলভাবে লগ আউট করা হয়েছে");
      setIsOpen(false);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("লগ আউট করা যায়নি");
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { path: "/", label: "হোম" },
    { path: "/courses", label: "কোর্সসমূহ" },
    { path: "/about", label: "আমাদের কথা" },
    { path: "/blog", label: "ব্লগ" },
    { path: "/contact", label: "যোগাযোগ" },
  ];

  const authLinks = user
    ? [
        { path: "/dashboard", label: "ড্যাশবোর্ড" },
        { path: "/my-enrolled-courses", label: "আমার শেখা" },
      ]
    : [];

  return (
    <nav className="sticky top-0 z-50 bg-[var(--surface-card)]/90 dark:bg-[var(--surface-dark-card)]/90 backdrop-blur-md border-b border-[var(--line)] dark:border-[var(--line-dark)] transition-colors duration-300">
      <div className="container-sand flex justify-between items-center h-20">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-2 text-2xl font-bold text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]"
          onClick={closeMenu}
        >
          <BookOpen className="w-8 h-8" />
          <span className="tracking-tight">Altrion</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {[...navLinks, ...authLinks].map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]"
                    : "text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] hover:text-[var(--sand-accent-strong)] dark:hover:text-[var(--sand-almond-silk)]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden lg:flex items-center space-x-4">
          <ThemeToggle />

          {user ? (
            <>
              <div className="relative group">
                <button className="flex items-center space-x-3 px-3 py-2 rounded-full hover:bg-[var(--surface-soft)] dark:hover:bg-[var(--surface-dark-soft)] transition-colors">
                  {user.photoURL ? (
                    <img
                      src={user?.photoURL}
                      alt={user?.displayName}
                      className="w-10 h-10 rounded-full border-2 border-[var(--sand-almond-silk)]"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/40";
                      }}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] flex items-center justify-center">
                      <User className="w-6 h-6 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">
                    {user?.displayName || "ব্যবহারকারী"}
                  </span>
                  <svg
                    className="w-4 h-4 text-[var(--text-faint)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div className="absolute right-0 mt-2 w-56 bg-[var(--surface-card)] dark:bg-[var(--surface-dark-card)] rounded-2xl shadow-lg border border-[var(--line)] dark:border-[var(--line-dark)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] hover:bg-[var(--surface-soft)] dark:hover:bg-[var(--surface-dark-soft)] transition-colors" onClick={closeMenu}>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>প্রোফাইল</span>
                      </div>
                    </Link>
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] hover:bg-[var(--surface-soft)] dark:hover:bg-[var(--surface-dark-soft)] transition-colors" onClick={closeMenu}>
                      <div className="flex items-center space-x-2">
                        <LayoutDashboard className="w-4 h-4" />
                        <span>ড্যাশবোর্ড</span>
                      </div>
                    </Link>
                    <Link to="/my-courses" className="block px-4 py-2 text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] hover:bg-[var(--surface-soft)] dark:hover:bg-[var(--surface-dark-soft)] transition-colors" onClick={closeMenu}>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4" />
                        <span>আমার কোর্স</span>
                      </div>
                    </Link>
                    <Link to="/my-enrolled-courses" className="block px-4 py-2 text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] hover:bg-[var(--surface-soft)] dark:hover:bg-[var(--surface-dark-soft)] transition-colors" onClick={closeMenu}>
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-4 h-4" />
                        <span>আমার শেখা</span>
                      </div>
                    </Link>
                    <div className="border-t border-[var(--line)] dark:border-[var(--line-dark)] my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] hover:bg-[var(--sand-linen)] dark:hover:bg-[var(--surface-dark-soft)] transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>লগ আউট</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="px-4 py-2 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] font-medium hover:text-[var(--sand-accent)] transition-colors"
              >
                লগ ইন
              </Link>
              <Link
                to="/signup"
                className="sand-btn"
              >
                রেজিস্টার
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-full bg-[var(--surface-soft)] dark:bg-[var(--surface-dark-soft)] text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] hover:scale-105 transition-transform"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[var(--surface-card)] dark:bg-[var(--surface-dark-card)] border-t border-[var(--line)] dark:border-[var(--line-dark)]">
          <div className="container-sand py-4 space-y-2">
            {[...navLinks, ...authLinks].map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]"
                      : "text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] hover:bg-[var(--surface-soft)] dark:hover:bg-[var(--surface-dark-soft)]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">
                থিম
              </span>
              <ThemeToggle />
            </div>

            {user ? (
              <div className="pt-4 border-t border-[var(--line)] dark:border-[var(--line-dark)] space-y-3">
                <Link
                  to="/profile"
                  onClick={closeMenu}
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-[var(--surface-soft)] dark:hover:bg-[var(--surface-dark-soft)] rounded-xl transition-colors"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full border-2 border-[var(--sand-almond-silk)]"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/40";
                      }}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] flex items-center justify-center">
                      <User className="w-6 h-6 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]" />
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">
                      {user.displayName || "ব্যবহারকারী"}
                    </p>
                    <p className="text-xs text-[var(--text-faint)] dark:text-[var(--text-dark-faint)]">
                      {user.email}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] rounded-xl hover:scale-[1.02] transition-transform"
                >
                  <LogOut className="w-4 h-4" />
                  <span>লগ আউট</span>
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-[var(--line)] dark:border-[var(--line-dark)] space-y-2">
                <Link
                  to="/signin"
                  onClick={closeMenu}
                  className="block w-full px-4 py-3 text-center text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] border border-[var(--sand-almond-silk)] rounded-xl hover:bg-[var(--sand-linen)] dark:hover:bg-[var(--surface-dark-soft)] transition-colors"
                >
                  লগ ইন
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="block w-full px-4 py-3 text-center sand-btn"
                >
                  রেজিস্টার
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
