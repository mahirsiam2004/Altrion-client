import { motion } from 'framer-motion'
import React from 'react'
import { Link } from 'react-router'
import { Star, CheckCircle2, ArrowRight } from 'lucide-react'

const Review = () => {
  return (
    <div>
      <section className="mt-10 py-24 bg-gradient-to-br from-[var(--sand-accent-strong)] to-[var(--sand-deep)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          ></div>
        </div>

        <div className="container-sand relative z-10">
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
              className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-4 text-white"
            >
              আমাদের শিক্ষার্থীদের কথা
            </motion.span>
            <h2 className="text-5xl font-bold text-white mb-4">
              সফলতার গল্প
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              হাজারো সন্তুষ্ট শিক্ষার্থীর সাথে যোগ দিন যারা বদলে দিয়েছে নিজেদের ক্যারিয়ার
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "জহিরুল ইসলাম", role: "ফুল স্ট্যাক ডেভেলপার", image: "https://randomuser.me/api/portraits/men/32.jpg", review: "Altrion আমার ক্যারিয়ার পুরোপুরি বদলে দিয়েছে! কোর্সগুলো খুব বিস্তারিত আর প্রশিক্ষকরা সবসময় সাহায্য করেন। মাত্র ৬ মাসে স্বপ্নের চাকরি পেয়েছি!", rating: 5, course: "ফুল স্ট্যাক বুটক্যাম্প" },
              { name: "জেসিকা মার্টিনেজ", role: "ইউআই/ইউএক্স ডিজাইনার", image: "https://randomuser.me/api/portraits/women/44.jpg", review: "ইউআই/ইউএক্স কোর্সটি আমার আশা ছাড়িয়ে গেছে। প্রজেক্টগুলো ছিল প্র্যাকটিক্যাল আর পোর্টফোলিও রেডি। ডিজাইন শেখা শুরু করার জন্য তীব্র ভাবে রিকমেন্ড করি!", rating: 5, course: "ইউআই/ইউএক্স মাস্টারক্লাস" },
              { name: "রায়ান কুমার", role: "ডেটা সায়েন্টিস্ট", image: "https://randomuser.me/api/portraits/men/45.jpg", review: "আমার ক্যারিয়ারে সেরা বিনিয়োগ! ডেটা সায়েন্স প্রোগ্রামটি বিস্তারিত আর ইন্ডাস্ট্রি আপডেটের সাথে। কমিউনিটি সাপোর্টও দারুণ!", rating: 5, course: "ডেটা সায়েন্স প্রো" },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: -20 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, type: "spring", stiffness: 100 }}
                whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
                className="relative group"
              >
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-[var(--sand-almond-silk)] via-[var(--sand-accent)] to-[var(--sand-deep)] rounded-2xl opacity-0 blur-xl"
                  whileHover={{ opacity: 0.5 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="relative bg-[var(--surface-card)] dark:bg-[var(--surface-dark-card)] rounded-2xl p-6 shadow-xl">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-[var(--sand-accent)] to-[var(--sand-accent-strong)] rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  <div className="flex justify-end mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.svg key={i} initial={{ scale: 0, rotate: -180 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2 + i * 0.1 }} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </motion.svg>
                    ))}
                  </div>

                  <p className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-6 italic leading-relaxed">
                    "{testimonial.review}"
                  </p>

                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] text-xs font-semibold rounded-full">
                      {testimonial.course}
                    </span>
                  </div>

                  <div className="border-t border-[var(--line)] dark:border-[var(--line-dark)] pt-4 mt-4">
                    <div className="flex items-center space-x-3">
                      <motion.img whileHover={{ scale: 1.1, rotate: 5 }} src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-[var(--sand-almond-silk)]" onError={(e)=>{e.target.src="https://via.placeholder.com/48?text=U";}} />
                      <div>
                        <h4 className="font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">{testimonial.name}</h4>
                        <p className="text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">{testimonial.role}</p>
                      </div>
                      <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.2 + 0.5 }} className="ml-auto">
                        <div className="w-8 h-8 bg-[var(--sand-accent)] rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.8 }} className="text-center mt-16">
            <p className="text-white text-lg mb-6">
              আপনার সফলতার গল্পটি লিখতে প্রস্তুত?
            </p>
            <Link to="/courses">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-10 py-4 bg-white text-[var(--sand-accent-strong)] rounded-full font-bold text-lg shadow-2xl hover:shadow-white/20 transition-all flex items-center gap-2 mx-auto">
                <span>আজই শেখা শুরু করুন</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Review
