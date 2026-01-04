import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Banner from "../components/Banner";
import CourseCard from "../components/CourseCard";
import CourseCardSkeleton from "../components/CourseCardSkeleton";
import { Users, Award, BookOpen, TrendingUp, Mail, HelpCircle, ChevronDown, CheckCircle, Zap, Target, Rocket, Star } from "lucide-react";
import Showcase3D from "../components/Showcase3D";
import Review from "./Review";
import { coursesAPI, categoriesAPI } from "../services/api";
import { toast } from "react-toastify";

export const Home = () => {
  const [popularCourses, setPopularCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    document.title = "Home - Altrion Learning Platform";
    fetchFeaturedCourses();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await categoriesAPI.getAllCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail) {
      toast.error("Please enter your email");
      return;
    }
    setNewsletterLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you for subscribing!");
      setNewsletterEmail("");
      setNewsletterLoading(false);
    }, 1000);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const fetchFeaturedCourses = async () => {
    try {
      setLoading(true);

      // Use the new getFeaturedCourses method
      const featuredCourses = await coursesAPI.getFeaturedCourses();
      
      // Ensure it's an array
      const coursesArray = Array.isArray(featuredCourses) ? featuredCourses : [];
      
      // If no featured courses, get all courses (limited to 6)
      if (coursesArray.length === 0) {
        const allCourses = await coursesAPI.getAllCourses();
        const allCoursesArray = Array.isArray(allCourses) ? allCourses : [];
        setPopularCourses(allCoursesArray.slice(0, 6));
      } else {
        setPopularCourses(coursesArray);
      }
      
    } catch (error) {
      console.error("Error fetching featured courses:", error);
      setPopularCourses([]);
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Banner Section */}
      <Banner />

      {/* Popular Courses Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Courses
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our most loved courses and start learning today
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))}
            </div>
          ) : popularCourses.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {popularCourses.map((course, index) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Link
                  to="/courses"
                  className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
                >
                  View All Courses
                </Link>
              </motion.div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No courses available yet
              </h3>
              <p className="text-gray-600 mb-6">
                Be the first to add a course!
              </p>
              <Link
                to="/add-course"
                className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Add Your First Course
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Altrion?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide the best learning experience with expert instructors
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <BookOpen className="w-12 h-12" />,
                title: "500+ Courses",
                description: "Wide range of courses across multiple domains",
                color: "bg-blue-500",
              },
              {
                icon: <Users className="w-12 h-12" />,
                title: "Expert Instructors",
                description: "Learn from industry professionals",
                color: "bg-green-500",
              },
              {
                icon: <Award className="w-12 h-12" />,
                title: "Certified Learning",
                description: "Get recognized certifications",
                color: "bg-purple-500",
              },
              {
                icon: <TrendingUp className="w-12 h-12" />,
                title: "Career Growth",
                description: "Boost your career with new skills",
                color: "bg-orange-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all"
              >
                <div
                  className={`${feature.color} w-20 h-20 rounded-full flex items-center justify-center text-white mb-6 mx-auto`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Showcase3D />
      <Review />

      {/* Categories Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Explore by Category
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Find courses in your area of interest
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.length > 0 ? (
              categories.slice(0, 12).map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                >
                  <Link
                  to={`/courses?category=${encodeURIComponent(category)}`}
                  className="block p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl text-center hover:shadow-lg transition-all"
                >
                  <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {category}
                  </span>
                </Link>
                </motion.div>
              ))
            ) : (
              ["Web Development", "Data Science", "Mobile Development", "UI/UX Design", "Digital Marketing", "Business"].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                >
                  <Link
                    to={`/courses?category=${encodeURIComponent(category)}`}
                    className="block p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl text-center hover:shadow-lg transition-all"
                  >
                    <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                    <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {category}
                    </span>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Join thousands of learners transforming their careers
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Users className="w-12 h-12" />, number: "50K+", label: "Active Students", color: "from-blue-400 to-blue-600" },
              { icon: <BookOpen className="w-12 h-12" />, number: "500+", label: "Courses Available", color: "from-purple-400 to-purple-600" },
              { icon: <Award className="w-12 h-12" />, number: "200+", label: "Expert Instructors", color: "from-pink-400 to-pink-600" },
              { icon: <Star className="w-12 h-12" />, number: "4.9/5", label: "Average Rating", color: "from-yellow-400 to-yellow-600" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -10 }}
                className="text-center"
              >
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-indigo-100 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Get the latest courses, tips, and exclusive offers delivered to your inbox
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
          >
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-12 pr-4 py-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </div>
            <button
              type="submit"
              disabled={newsletterLoading}
              className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {newsletterLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Subscribing...</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <Zap className="w-5 h-5" />
                </>
              )}
            </button>
          </motion.form>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Everything you need to know about our platform
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "How do I enroll in a course?",
                answer: "Simply browse our courses, click on any course that interests you, and click the 'Enroll Now' button. You'll need to be signed in to enroll."
              },
              {
                question: "Are the courses self-paced?",
                answer: "Yes! Most of our courses are self-paced, allowing you to learn at your own speed. Some courses may have scheduled live sessions which will be clearly indicated."
              },
              {
                question: "Do I get a certificate after completing a course?",
                answer: "Yes, upon successful completion of a course, you'll receive a certificate that you can add to your LinkedIn profile or resume."
              },
              {
                question: "Can I access courses on mobile devices?",
                answer: "Absolutely! Our platform is fully responsive and works seamlessly on mobile phones, tablets, and desktop computers."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, debit cards, and PayPal. Some courses are also available for free."
              },
              {
                question: "Can I get a refund if I'm not satisfied?",
                answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with your purchase, contact our support team for a full refund."
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                    <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-4 text-gray-600 dark:text-gray-400"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Rocket className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who are already transforming their careers with our courses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
                >
                  Browse All Courses
                </motion.button>
              </Link>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white/10 transition-all"
                >
                  Create Free Account
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Top Instructors Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Top Instructors
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Learn from the best in the industry
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Jhankar Mahbub",
                role: "Web Development Expert",
                image:
                  "https://imgs.search.brave.com/z4LF6n0yDRml0zIX-H4rylxID7Hi1ZUvTMNBBsNBDEU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dGJzbmV3cy5uZXQv/c2l0ZXMvZGVmYXVs/dC9maWxlcy9zdHls/ZXMvaW5mb2dyYXBo/L3B1YmxpYy9pbWFn/ZXMvMjAyMS8wNy8w/OC9pbWdfMjg0Ml8w/LmpwZw",
                courses: 25,
                students: 10500,
              },
              {
                name: "Michael Chen",
                role: "Data Science Guru",
                image: "https://randomuser.me/api/portraits/men/2.jpg",
                courses: 18,
                students: 8200,
              },
              {
                name: "Emily Davis",
                role: "UI/UX Designer",
                image: "https://randomuser.me/api/portraits/women/3.jpg",
                courses: 22,
                students: 9300,
              },
              {
                name: "David Wilson",
                role: "Mobile Dev Specialist",
                image: "https://randomuser.me/api/portraits/men/4.jpg",
                courses: 20,
                students: 7800,
              },
            ].map((instructor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 text-center shadow-md hover:shadow-xl transition-all"
              >
                <img
                  src={instructor.image}
                  alt={instructor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {instructor.name}
                </h3>
                <p className="text-indigo-600 font-semibold mb-4">
                  {instructor.role}
                </p>
                <div className="flex justify-center space-x-6 text-sm text-gray-600">
                  <div>
                    <p className="font-bold text-gray-900">
                      {instructor.courses}
                    </p>
                    <p>Courses</p>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      {instructor.students.toLocaleString()}
                    </p>
                    <p>Students</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;