import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--surface-soft)] dark:bg-[var(--surface-card)] text-[var(--text-soft)] dark:text-[var(--text-faint)] border-t border-[var(--line)] dark:border-[var(--line)]">
      {/* Main Footer */}
      <div className="container-sand py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About Section — logo (matches navbar) */}
          <div>
            <Link to="/" className="flex items-center space-x-3 mb-4">
              <img
                src="/logo.png"
                alt="Altrion Logo"
                className="w-12 h-12 object-contain"
              />
            </Link>
            <p className="text-sm text-[var(--text-soft)] dark:text-[var(--text-faint)] mb-5 leading-relaxed">
              গুণমানসম্পন্ন শিক্ষা আর উদ্ভাবনী কোর্সের মাধ্যমে শিক্ষার্থীদের স্বপ্ন
              পূরণে আমরা পাশে আছি। হাজারো শিক্ষার্থীর শেখার যাত্রায় যোগ দিন।
            </p>
            <div className="flex space-x-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--surface-card)] dark:bg-[var(--surface-soft)] hover:text-[var(--sage)] dark:hover:text-[var(--amber)] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--surface-card)] dark:bg-[var(--surface-soft)] hover:text-[var(--sage)] dark:hover:text-[var(--amber)] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--surface-card)] dark:bg-[var(--surface-soft)] hover:text-[var(--sage)] dark:hover:text-[var(--amber)] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--surface-card)] dark:bg-[var(--surface-soft)] hover:text-[var(--sage)] dark:hover:text-[var(--amber)] transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-[var(--surface-card)] dark:bg-[var(--surface-soft)] hover:text-[var(--sage)] dark:hover:text-[var(--amber)] transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-ink)] dark:text-[var(--cream)] mb-5">
              দ্রুত লিংক
            </h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm hover:text-[var(--sage)] dark:hover:text-[var(--amber)] transition-colors">হোম</Link></li>
              <li><Link to="/courses" className="text-sm hover:text-[var(--sage)] dark:hover:text-[var(--amber)] transition-colors">সব কোর্স</Link></li>
              <li><Link to="/about" className="text-sm hover:text-[var(--sage)] dark:hover:text-[var(--amber)] transition-colors">আমাদের কথা</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-[var(--sage)] dark:hover:text-[var(--amber)] transition-colors">যোগাযোগ</Link></li>
              <li><Link to="/blog" className="text-sm hover:text-[var(--sage)] dark:hover:text-[var(--amber)] transition-colors">ব্লগ</Link></li>
            </ul>
          </div>

          {/* Popular Courses */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-ink)] dark:text-[var(--cream)] mb-5">
              জনপ্রিয় কোর্স
            </h3>
            <ul className="space-y-3">
              <li><a href="/courses" className="text-sm hover:text-[var(--sage)] dark:hover:text-[var(--amber)] transition-colors">ওয়েব ডেভেলপমেন্ট</a></li>
              <li><a href="/courses" className="text-sm hover:text-[var(--sage)] dark:hover:text-[var(--amber)] transition-colors">ডেটা সায়েন্স</a></li>
              <li><a href="/courses" className="text-sm hover:text-[var(--sage)] dark:hover:text-[var(--amber)] transition-colors">মোবাইল অ্যাপ</a></li>
              <li><a href="/courses" className="text-sm hover:text-[var(--sage)] dark:hover:text-[var(--amber)] transition-colors">ইউআই/ইউএক্স ডিজাইন</a></li>
              <li><a href="/courses" className="text-sm hover:text-[var(--sage)] dark:hover:text-[var(--amber)] transition-colors">ডিজিটাল মার্কেটিং</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-ink)] dark:text-[var(--cream)] mb-5">
              যোগাযোগ
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[var(--sage)] dark:text-[var(--amber)] flex-shrink-0 mt-0.5" />
                <span className="text-sm">১২৩ লার্নিং স্ট্রিট, এডুকেশন সিটি</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[var(--sage)] dark:text-[var(--amber)] flex-shrink-0" />
                <span className="text-sm">+৮৮ ০১৭১২-৩৪৫৬৭৮</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[var(--sage)] dark:text-[var(--amber)] flex-shrink-0" />
                <span className="text-sm">support@altrion.com</span>
              </li>
            </ul>
            <div className="mt-5">
              <h4 className="text-sm font-semibold text-[var(--text-ink)] dark:text-[var(--cream)] mb-3">
                নিউজলেটার
              </h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="আপনার ইমেইল"
                  className="sand-input flex-1 rounded-r-none border-r-0"
                />
                <button className="sand-btn rounded-l-none px-4">
                  সাবস্ক্রাইব
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--line)] dark:border-[var(--line)]">
        <div className="container-sand py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-[var(--text-faint)] dark:text-[var(--text-faint)]">
              © {currentYear} Altrion. সর্বস্বত্ব সংরক্ষিত।
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-sm text-[var(--text-faint)] dark:text-[var(--text-faint)] hover:text-[var(--sage)] dark:hover:text-[var(--amber)] transition-colors">গোপনীয়তা</Link>
              <Link to="/terms" className="text-sm text-[var(--text-faint)] dark:text-[var(--text-faint)] hover:text-[var(--sage)] dark:hover:text-[var(--amber)] transition-colors">শর্তাবলী</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
