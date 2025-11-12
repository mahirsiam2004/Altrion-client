import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Banner from "../components/Banner";
import CourseCard from "../components/CourseCard";
import { Users, Award, BookOpen, TrendingUp } from "lucide-react";
import Showcase3D from "../components/Showcase3D";
import Review from "./Review";

export const Home = () => {
  const [popularCourses, setPopularCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch featured courses
    fetch("https://altrion-server.vercel.app/courses/featured")
      .then((res) => res.json())
      .then((data) => {
        setPopularCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching featured courses:", err);
        setLoading(false);
      });
  }, []);

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
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
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
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/courses"
              className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold "
            >
              View All Courses
            </Link>
          </motion.div>
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

      <Showcase3D></Showcase3D>
      <Review></Review>

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
