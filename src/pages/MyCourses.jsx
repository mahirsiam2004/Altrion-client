import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Edit, Trash2, Eye, Plus, BookOpen } from "lucide-react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { coursesAPI } from "../services/api";
import Swal from "sweetalert2";

const MyCourses = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) fetchMyCourses();
  }, [user]);

  const fetchMyCourses = async () => {
    try {
      const data = await coursesAPI.getCoursesByInstructor(user.email);
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("আপনার কোর্স লোড করা যায়নি");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    const result = await Swal.fire({
      title: "নিশ্চিত করছেন?",
      text: `"${title}" মুছে ফেলতে চান? এটি ফেরানো যাবে না।`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#b08968",
      cancelButtonColor: "#9c8a7d",
      confirmButtonText: "হ্যাঁ, মুছুন",
      cancelButtonText: "বাতিল",
    });
    if (!result.isConfirmed) return;
    try {
      await coursesAPI.deleteCourse(id);
      setCourses(courses.filter((course) => course._id !== id));
      Swal.fire({ title: "মোছা হয়েছে!", text: `"${title}" সফলভাবে মোছা হয়েছে।`, icon: "success", timer: 2000, showConfirmButton: false });
    } catch (error) {
      console.error("Error deleting course:", error);
      Swal.fire({ title: "ত্রুটি!", text: "কোর্স মোছা যায়নি। আবার চেষ্টা করুন।", icon: "error", confirmButtonColor: "#b08968" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--surface)] dark:bg-[var(--surface-dark)]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--sand-accent)]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--surface)] dark:bg-[var(--surface-dark)] py-12">
      <div className="container-sand">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-2">আমার কোর্স</h1>
            <p className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">আপনার তৈরি কোর্স ম্যানেজ ও ট্র্যাক করুন</p>
          </div>
          <Link to="/dashboard/add-course" className="sand-btn flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>নতুন কোর্স</span>
          </Link>
        </div>

        {courses.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="sand-card p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-2">এখনো কোনো কোর্স নেই</h3>
            <p className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-6">প্রথম কোর্স তৈরি করে আপনার জ্ঞান ছড়িয়ে দিন</p>
            <Link to="/dashboard/add-course" className="sand-btn inline-flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>প্রথম কোর্স তৈরি করুন</span>
            </Link>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {courses.map((course, index) => (
              <motion.div key={course._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="sand-card overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4">
                    <img src={course.imageURL} alt={course.title} className="w-full h-48 md:h-full object-cover" onError={(e)=>{e.target.src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg";}} />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-2">{course.title}</h3>
                        <span className="inline-block px-3 py-1 bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] text-sm font-semibold rounded-full">{course.category}</span>
                      </div>
                      {course.isFeatured && (
                        <span className="px-3 py-1 bg-[var(--sand-almond-silk)] text-white text-xs font-bold rounded-full">বিশেষ</span>
                      )}
                    </div>
                    <p className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-6">
                      <div><span className="font-semibold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">{course.price ? `$${course.price}` : "ফ্রি"}</span></div>
                      <div>{course.duration}</div>
                      <div>{course.enrolledStudents || 0} জন এনরোল</div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Link to={`/course/${course._id}`} className="sand-btn-ghost flex items-center space-x-2 px-4 py-2 text-sm">
                        <Eye className="w-4 h-4" /><span>বিস্তারিত</span>
                      </Link>
                      <Link to={`/dashboard/update-course/${course._id}`} className="flex items-center space-x-2 px-4 py-2 bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] rounded-lg hover:opacity-80 transition-colors text-sm">
                        <Edit className="w-4 h-4" /><span>আপডেট</span>
                      </Link>
                      <button onClick={() => handleDelete(course._id, course.title)} className="flex items-center space-x-2 px-4 py-2 bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] rounded-lg hover:opacity-80 transition-colors text-sm">
                        <Trash2 className="w-4 h-4" /><span>মুছুন</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
