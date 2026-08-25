import React, { useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Clock, Users, Award, BookOpen, CheckCircle, Share2 } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { enrollmentsAPI } from "../services/api";
import Swal from "sweetalert2";

const CourseDetails = () => {
  const course = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleEnroll = async () => {
    if (!user) {
      Swal.fire({
        title: "লগ ইন প্রয়োজন",
        text: "এই কোর্সে এনরোল করতে দয়া করে লগ ইন করুন।",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "লগ ইনে যান",
        cancelButtonText: "বাতিল",
        confirmButtonColor: "#b08968",
      }).then((res) => {
        if (res.isConfirmed) navigate("/signin");
      });
      return;
    }

    try {
      const enrollment = {
        courseId: course._id,
        userEmail: user.email,
        userName: user.displayName,
        courseTitle: course.title,
      };
      await enrollmentsAPI.createEnrollment(enrollment);
      await Swal.fire({
        title: "এনরোল সফল!",
        html: `<div style="font-size:14px;color:#7a6f63">আপনি সফলভাবে <b>${course.title}</b> কোর্সে ভর্তি হয়েছেন।</div>`,
        icon: "success",
        confirmButtonText: "দারুণ!",
        confirmButtonColor: "#b08968",
        backdrop: true,
      });
    } catch (error) {
      console.error("Enrollment error:", error);
      if (error.response?.status === 400) {
        await Swal.fire({
          title: "আপনি ইতিমধ্যে এনরোল করেছেন",
          text: `আপনি "${course.title}" কোর্সে ইতিমধ্যে ভর্তি আছেন।`,
          icon: "info",
          confirmButtonColor: "#b08968",
        });
        return;
      }
      Swal.fire({
        title: "এনরোল ব্যর্থ",
        text: error.response?.data?.message || "কিছু ভুল হয়েছে। আবার চেষ্টা করুন।",
        icon: "error",
        confirmButtonColor: "#b08968",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] dark:bg-[var(--surface-dark)] py-24">
      <div className="container-sand">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sand-card overflow-hidden mb-8"
        >
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="h-96 lg:h-auto">
              <img src={course.imageURL} alt={course.title} className="w-full h-full object-cover" onError={(e)=>{e.target.src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg";}} />
            </div>

            <div className="p-8">
              <span className="inline-block px-4 py-2 bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] text-sm font-bold rounded-full mb-4">
                {course.category}
              </span>

              <h1 className="text-4xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-4">
                {course.title}
              </h1>

              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Star size={20} fill="#e0a458" className="text-[var(--sand-accent)]" />
                  <span className="text-lg font-semibold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">
                    {course.rating ? course.rating.toFixed(1) : "নতুন"}
                  </span>
                  <span className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">
                    ({course.enrolledStudents || 0} রিভিউ)
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">
                  <Users size={20} />
                  <span>{course.enrolledStudents || 0} জন এনরোল করেছেন</span>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]">
                  {course.price ? `$${course.price}` : "ফ্রি"}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEnroll}
                className="w-full sand-btn text-lg"
              >
                <BookOpen className="w-6 h-6" />
                <span>এনরোল করুন</span>
              </motion.button>

              {course.instructor && (
                <div className="mt-6 p-4 bg-[var(--surface-soft)] dark:bg-[var(--surface-dark-soft)] rounded-xl">
                  <p className="text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-2">প্রশিক্ষক</p>
                  <div className="flex items-center space-x-3">
                    <img
                      src={course.instructor.photo || "https://via.placeholder.com/48"}
                      alt={course.instructor.name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => { e.target.src = "https://via.placeholder.com/48"; }}
                    />
                    <div>
                      <p className="font-semibold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">{course.instructor.name}</p>
                      <p className="text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">{course.instructor.email}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Details */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="sand-card p-8"
            >
              <h2 className="text-2xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-4">
                এই কোর্স সম্পর্কে
              </h2>
              <p className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] leading-relaxed">
                {course.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="sand-card p-8"
            >
              <h2 className="text-2xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-4">
                আপনি যা শিখবেন
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "মৌলিক বিষয়গুলো দক্ষতার সাথে আয়ত্ত করবেন",
                  "বাস্তব প্রজেক্ট তৈরি করবেন",
                  "সার্টিফিকেট অর্জন করবেন",
                  "ম্যাটেরিয়ালে লাইফটাইম অ্যাক্সেস",
                  "ইন্ডাস্ট্রি বিশেষজ্ঞদের কাছ থেকে শিখবেন",
                  "শিক্ষার্থী কমিউনিটিতে যোগ দেবেন",
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-[var(--sand-accent)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="sand-card p-6"
            >
              <h3 className="text-xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-4">
                কোর্স ফিচার
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]" />
                  <div>
                    <p className="text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">সময়কাল</p>
                    <p className="font-semibold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">{course.duration || "নিজস্ব গতি"}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-6 h-6 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]" />
                  <div>
                    <p className="text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">সার্টিফিকেট</p>
                    <p className="font-semibold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">অন্তর্ভুক্ত</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-6 h-6 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]" />
                  <div>
                    <p className="text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">অ্যাক্সেস</p>
                    <p className="font-semibold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">লাইফটাইম</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="sand-card p-6"
            >
              <h3 className="text-xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-4">
                কোর্স শেয়ার করুন
              </h3>
              <div className="flex space-x-3">
                <button className="flex-1 px-4 py-2 bg-[var(--sand-accent)] text-white rounded-lg hover:opacity-90 transition-colors">
                  Facebook
                </button>
                <button className="flex-1 px-4 py-2 bg-[var(--sand-accent-strong)] text-white rounded-lg hover:opacity-90 transition-colors">
                  Twitter
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
