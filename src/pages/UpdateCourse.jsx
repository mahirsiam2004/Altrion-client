import React, { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpen,
  DollarSign,
  Clock,
  Image,
  Tag,
  FileText,
} from "lucide-react";
import { coursesAPI } from "../services/api";
import Swal from "sweetalert2";

const UpdateCourse = () => {
  const course = useLoaderData();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: course.title || "",
    imageURL: course.imageURL || "",
    price: course.price || "",
    duration: course.duration || "",
    category: course.category || "",
    description: course.description || "",
    isFeatured: course.isFeatured || false,
  });

  const categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "UI/UX Design",
    "Digital Marketing",
    "Business",
    "Photography",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedData = {
        ...formData,
        price: parseFloat(formData.price),
        instructor: course.instructor, // Keep original instructor
      };

      await coursesAPI.updateCourse(course._id, updatedData);

      // ✅ Success alert using SweetAlert2
      Swal.fire({
        title: "Course Updated!",
        text: "Your course has been updated successfully 🎉",
        icon: "success",
        confirmButtonColor: "#4F46E5",
        confirmButtonText: "Go to My Courses",
      }).then(() => {
        navigate("/my-courses");
      });
    } catch (error) {
      console.error("Error updating course:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to update course. Please try again later.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Update Course
            </h1>
            <p className="text-gray-600">Edit your course details</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Title *
              </label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL *
              </label>
              <div className="relative">
                <Image className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  name="imageURL"
                  value={formData.imageURL}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Price & Duration */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (USD) *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                ></textarea>
              </div>
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label className="ml-2 text-sm text-gray-700">
                Mark as Featured Course
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Updating..." : "Update Course"}
              </motion.button>
              <button
                type="button"
                onClick={() => navigate("/my-courses")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UpdateCourse;