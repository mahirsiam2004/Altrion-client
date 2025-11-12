import React from "react";
import { motion } from "framer-motion";
import "./Showcase3D.css";

const Showcase3D = () => {
  return (
    <section className="showcase-section ">
      <div className="showcase-container">
        {/* TEXT */}
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

        {/* 3D CUBE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="showcase-cube-wrapper"
        >
          <div className="cube-scene">
            <div className="cube mt-20 ">
            
              <div className="cube__face cube__face--front">
                <img
                  src="https://i.postimg.cc/25xWSLjD/Screenshot-from-2025-11-12-21-15-53-removebg-preview-2.png"
                  alt="Altrion Logo"
                  className="cube-logo"
                />
              </div>

           
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

              
              <div className="cube__face cube__face--right">
                <div className="cube-img-wrapper">
                  <img
                    src="https://i.postimg.cc/25xWSLjD/Screenshot-from-2025-11-12-21-15-53-removebg-preview-2.png"
                    alt="Mahir Siam"
                    className="cube-img"
                  />
                </div>
                <p className="cube-caption">Meet Mahir Siam</p>
              </div>

              
              <div className="cube__face cube__face--left">
                <div className="cube-img-wrapper">
                  <img
                    src="https://i.postimg.cc/25xWSLjD/Screenshot-from-2025-11-12-21-15-53-removebg-preview-2.png"
                    alt="React Mastery"
                    className="cube-img"
                  />
                </div>
                <p className="cube-caption">React Mastery 2025</p>
              </div>

           
              <div className="cube__face cube__face--top">
                <div className="cube-img-wrapper">
                  <img
                    src="https://i.postimg.cc/25xWSLjD/Screenshot-from-2025-11-12-21-15-53-removebg-preview-2.png"
                    alt="Certificate"
                    className="cube-img"
                  />
                </div>
                <p className="cube-caption">Downloadable Certificate</p>
              </div>

             
              <div className="cube__face cube__face--bottom">
                <div className="cube-img-wrapper">
                  <img
                    src="https://i.postimg.cc/25xWSLjD/Screenshot-from-2025-11-12-21-15-53-removebg-preview-2.png"
                    alt="Dashboard"
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