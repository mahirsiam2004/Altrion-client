import React from "react";
import { motion } from "framer-motion";
import "./Showcase3D.css";

const Showcase3D = () => {
  return (
    <section className="showcase-section">
      <div className="showcase-container">
        {/* ---------- TEXT ---------- */}
        <motion.article
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="showcase-text"
        >
          <h1 className="showcase-title">
            Unlock <span className="gradient-text">Unlimited</span> Knowledge
          </h1>

          <p className="showcase-desc">
            Altrion brings world-class instructors, bite-sized lessons, and
            interactive projects straight to your screen. Learn at your own pace,
            earn certificates, and track progress with beautiful dashboards.
          </p>

          <motion.a
            href="/courses"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            className="showcase-cta"
          >
            Explore All Courses
          </motion.a>
        </motion.article>

        {/* ---------- 3-D CUBE ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="showcase-cube-wrapper"
        >
          <div className="cube-scene">
            <div className="cube">
              {/* Face 1 – Logo */}
              <div className="cube__face cube__face--front">
                <img
                  src="/src/assets/logo.png"
                  alt="Altrion Logo"
                  className="cube-logo"
                />
              </div>

              {/* Face 2 – Stats */}
              <div className="cube__face cube__face--back">
                <div className="cube-stats">
                  <p className="stat">12k+</p>
                  <p className="label">Active Learners</p>

                  <p className="stat">350+</p>
                  <p className="label">Expert Courses</p>

                  <p className="stat">4.9 stars</p>
                  <p className="label">Avg. Rating</p>
                </div>
              </div>

              {/* Face 3 – Instructor */}
              <div className="cube__face cube__face--right">
                <div className="cube-img-wrapper">
                  <img
                    src="/src/assets/mahir.jpeg"
                    alt="mahir siam"
                    className="cube-img"
                  />
                </div>
                <p className="cube-caption">Meet Mahir Siam</p>
              </div>

              {/* Face 4 – Course Preview */}
              <div className="cube__face cube__face--left">
                <div className="cube-img-wrapper">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1720032305159-28f237187095?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
                    className="cube-img"
                  />
                </div>
                <p className="cube-caption">React Mastery 2025</p>
              </div>

              {/* Face 5 – Certificate */}
              <div className="cube__face cube__face--top">
                <div className="cube-img-wrapper">
                  <img
                    src="https://plus.unsplash.com/premium_photo-1738424351934-5c1d497f5d85?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170"
                    alt="Certificate"
                    className="cube-img"
                  />
                </div>
                <p className="cube-caption">Downloadable Certificate</p>
              </div>

              {/* Face 6 – Dashboard */}
              <div className="cube__face cube__face--bottom">
                <div className="cube-img-wrapper">
                  <img
                    src="/src/assets/dash.png"
                    className="cube-img"
                  />
                </div>
                <p className="cube-caption">Progress Dashboard</p>
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

