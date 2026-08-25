import React from "react";
import { motion } from "framer-motion";
import "./Showcase3D.css";

const Showcase3D = () => {
  return (
    <section className="showcase-section">
      <div className="showcase-container">
        <motion.article
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="showcase-text"
        >
          <h1 className="showcase-title">
            অসীম <span className="gradient-text">জ্ঞান</span> এখন আপনার হাতে
          </h1>

          <p className="showcase-desc">
            Altrion নিয়ে আসে বিশ্বমানের প্রশিক্ষক, ছোট ছোট পাঠ আর ইন্টারেক্টিভ
            প্রজেক্ট — সরাসরি আপনার স্ক্রিনে। নিজের গতিতে শিখুন, সার্টিফিকেট অর্জন
            করুন আর সুন্দর ড্যাশবোর্ডে প্রগ্রেস ট্র্যাক করুন।
          </p>

          <motion.a href="/courses" whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.96 }} className="showcase-cta">
            সব কোর্স দেখুন
          </motion.a>
        </motion.article>

        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="showcase-cube-wrapper"
        >
          <div className="cube-scene">
            <div className="cube mt-20">
              <div className="cube__face cube__face--front">
                <img
                  src="https://i.postimg.cc/25xWSLjD/Screenshot-from-2025-11-12-21-15-53-removebg-preview-2.png"
                  alt="Altrion Logo"
                  className="cube-logo"
                />
              </div>
              <div className="cube__face cube__face--back">
                <div className="cube-stats">
                  <p className="stat">১২k+</p>
                  <p className="label">সক্রিয় শিক্ষার্থী</p>
                  <p className="stat">৩৫০+</p>
                  <p className="label">সেরা কোর্স</p>
                  <p className="stat">৪.৯ স্টার</p>
                  <p className="label">গড় রেটিং</p>
                </div>
              </div>
              <div className="cube__face cube__face--right">
                <div className="cube-img-wrapper">
                  <img
                    src="https://i.postimg.cc/25xWSLjD/Screenshot-from-2025-11-12-21-15-53-removebg-preview-2.png"
                    alt="Mahir Siam"
                    className="cube-img"
                  />
                </div>
                <p className="cube-caption">মাহির সিয়াম-এর সাথে</p>
              </div>
              <div className="cube__face cube__face--left">
                <div className="cube-img-wrapper">
                  <img
                    src="https://i.postimg.cc/25xWSLjD/Screenshot-from-2025-11-12-21-15-53-removebg-preview-2.png"
                    alt="React Mastery"
                    className="cube-img"
                  />
                </div>
                <p className="cube-caption">React মাস্টারি ২০২৫</p>
              </div>
              <div className="cube__face cube__face--top">
                <div className="cube-img-wrapper">
                  <img
                    src="https://i.postimg.cc/25xWSLjD/Screenshot-from-2025-11-12-21-15-53-removebg-preview-2.png"
                    alt="Certificate"
                    className="cube-img"
                  />
                </div>
                <p className="cube-caption">ডাউনলোডযোগ্য সার্টিফিকেট</p>
              </div>
              <div className="cube__face cube__face--bottom">
                <div className="cube-img-wrapper">
                  <img
                    src="https://i.postimg.cc/25xWSLjD/Screenshot-from-2025-11-12-21-15-53-removebg-preview-2.png"
                    alt="Dashboard"
                    className="cube-img"
                  />
                </div>
                <p className="cube-caption">প্রগ্রেস ড্যাশবোর্ড</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="showcase-glow" />
    </section>
  );
};

export default Showcase3D;
