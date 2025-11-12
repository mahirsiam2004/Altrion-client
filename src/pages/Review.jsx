import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router'

const Review = () => {
  return (
    <div>
      <section className="mt-10 py-20 bg-gradient-to-br from-indigo-900 to-purple-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm  rounded-full text-sm font-semibold mb-4"
            >
              💬 What Our Students Say
            </motion.span>
            <h2 className="text-5xl font-bold text-white mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              Join thousands of satisfied learners who transformed their careers
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Jhankar Mahbub",
                role: "Full Stack Developer",
                image:
                  "https://imgs.search.brave.com/z4LF6n0yDRml0zIX-H4rylxID7Hi1ZUvTMNBBsNBDEU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dGJzbmV3cy5uZXQv/c2l0ZXMvZGVmYXVs/dC9maWxlcy9zdHls/ZXMvaW5mb2dyYXBo/L3B1YmxpYy9pbWFn/ZXMvMjAyMS8wNy8w/OC9pbWdfMjg0Ml8w/LmpwZw",
                review:
                  "Altrion completely changed my career! The courses are incredibly detailed and the instructors are always there to help. Landed my dream job in just 6 months!",
                rating: 5,
                course: "Full Stack Bootcamp",
              },
              {
                name: "Jessica Martinez",
                role: "UI/UX Designer",
                image: "https://randomuser.me/api/portraits/women/44.jpg",
                review:
                  "The UI/UX design course exceeded all my expectations. The projects were practical and portfolio-ready. Highly recommend to anyone starting their design journey!",
                rating: 5,
                course: "UI/UX Masterclass",
              },
              {
                name: "Ryan Kumar",
                role: "Data Scientist",
                image: "https://randomuser.me/api/portraits/men/45.jpg",
                review:
                  "Best investment in my career! The data science program is comprehensive and up-to-date with industry standards. Amazing community support too!",
                rating: 5,
                course: "Data Science Pro",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(255, 255, 255, 0.25)",
                }}
                className="relative group"
              >
                {/* Card Glow */}
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl opacity-0 blur-xl"
                  whileHover={{ opacity: 0.6 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Main Card */}
                <div className="relative bg-white rounded-2xl p-6 shadow-xl">
                  {/* Quote Icon */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex justify-end mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.svg
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + i * 0.1 }}
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 mb-6 italic leading-relaxed">
                    "{testimonial.review}"
                  </p>

                  {/* Course Badge */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                      {testimonial.course}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex items-center space-x-3">
                      {/* Avatar */}
                      <motion.img
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500"
                      />

                      <div>
                        <h4 className="font-bold text-gray-900">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {testimonial.role}
                        </p>
                      </div>

                      {/* Verified Badge */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + 0.5 }}
                        className="ml-auto"
                      >
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <p className="text-white text-lg mb-6">
              Ready to write your success story?
            </p>
            <Link to="/courses">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-white text-indigo-900 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/20 transition-all"
              >
                Start Learning Today
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Review