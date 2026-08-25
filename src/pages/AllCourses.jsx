import React, { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { Filter, Search, X, BookOpen } from "lucide-react";

const AllCourses = () => {
  const initialData = useLoaderData();
  const [filteredCourses, setFilteredCourses] = useState(initialData || []);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const gridRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://altrion-server.vercel.app/categories");
        const data = await response.json();
        setCategories(["All", ...data]);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories(["All", "ওয়েব ডেভেলপমেন্ট", "ডেটা সায়েন্স", "মোবাইল ডেভেলপমেন্ট", "ইউআই/ইউএক্স", "ডিজিটাল মার্কেটিং", "বিজনেস"]);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const filterCourses = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (selectedCategory !== "All") params.append("category", selectedCategory);
        if (searchTerm.trim()) params.append("search", searchTerm);
        const response = await fetch(`https://altrion-server.vercel.app/courses?${params.toString()}`);
        const data = await response.json();
        setFilteredCourses(data);
      } catch (error) {
        console.error("Error filtering courses:", error);
        let filtered = initialData || [];
        if (selectedCategory !== "All") {
          filtered = filtered.filter((course) => course.category === selectedCategory);
        }
        if (searchTerm.trim()) {
          filtered = filtered.filter((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        setFilteredCourses(filtered);
      } finally {
        setLoading(false);
      }
    };
    filterCourses();
  }, [selectedCategory, searchTerm, initialData]);

  const handleCategoryChange = (category) => setSelectedCategory(category);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  return (
    <div className="min-h-screen bg-[var(--surface)] dark:bg-[var(--surface-dark)] py-24 transition-colors duration-300">
      <div className="container-sand">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="sand-eyebrow mb-4">কোর্স ক্যাটালগ</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-4 mt-4">
            আমাদের কোর্সসমূহ
          </h1>
          <p className="text-lg text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">
            আপনার দক্ষতা বাড়াতে সেরা কোর্সগুলো খুঁজে নিন
          </p>
        </div>

        {/* Filters */}
        <div className="sand-card p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-8">
              <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-2">
                কোর্স খুঁজুন
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-faint)]" />
                <input
                  type="text"
                  placeholder="কোর্সের নাম লিখুন..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="sand-input pl-10"
                />
              </div>
            </div>

            <div className="lg:col-span-4">
              <label className="block text-sm font-medium text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-2">
                <Filter className="w-4 h-4 inline-block mr-1" />
                ক্যাটাগরি অনুযায়ী
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="sand-input cursor-pointer"
              >
                {categories.length === 0 ? (
                  <option>ক্যাটাগরি লোড হচ্ছে...</option>
                ) : (
                  categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))
                )}
              </select>
            </div>
          </div>

          {(selectedCategory !== "All" || searchTerm) && (
            <div className="flex items-center gap-2 mt-4 flex-wrap pt-4 border-t border-[var(--line)] dark:border-[var(--line-dark)]">
              <span className="text-sm text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] font-medium">
                সক্রিয় ফিল্টার:
              </span>
              {selectedCategory !== "All" && (
                <span className="px-3 py-1.5 bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] rounded-full text-sm font-medium flex items-center space-x-2">
                  <span>{selectedCategory}</span>
                  <button onClick={() => setSelectedCategory("All")} className="hover:opacity-70 ml-1">
                    <X className="w-4 h-4" />
                  </button>
                </span>
              )}
              {searchTerm && (
                <span className="px-3 py-1.5 bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)] rounded-full text-sm font-medium flex items-center space-x-2">
                  <span>"{searchTerm}"</span>
                  <button onClick={() => setSearchTerm("")} className="hover:opacity-70 ml-1">
                    <X className="w-4 h-4" />
                  </button>
                </span>
              )}
              <button
                onClick={() => { setSelectedCategory("All"); setSearchTerm(""); }}
                className="px-3 py-1.5 bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] rounded-full text-sm font-medium hover:opacity-80 transition-colors"
              >
                সব মুছুন
              </button>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)]">
            দেখানো হচ্ছে{" "}
            <span className="font-semibold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)]">
              {filteredCourses.length}
            </span>{" "}
            টি কোর্স
          </p>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--sand-accent)]"></div>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[var(--sand-linen)] dark:bg-[var(--surface-dark-soft)] flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-[var(--sand-accent-strong)] dark:text-[var(--sand-almond-silk)]" />
            </div>
            <h3 className="text-2xl font-semibold text-[var(--text-ink)] dark:text-[var(--text-dark-ink)] mb-2">
              কোনো কোর্স পাওয়া যায়নি
            </h3>
            <p className="text-[var(--text-soft)] dark:text-[var(--text-dark-soft)] mb-6">
              ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন
            </p>
            <button
              onClick={() => { setSelectedCategory("All"); setSearchTerm(""); }}
              className="sand-btn"
            >
              ফিল্টার মুছুন
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCourses;
