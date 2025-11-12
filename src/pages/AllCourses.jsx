import React, { useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import gsap from "gsap";
import { Filter, Search, X } from "lucide-react";

const AllCourses = () => {
  const initialData = useLoaderData();
  const [filteredCourses, setFilteredCourses] = useState(initialData);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const gridRef = useRef(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        const data = await response.json();
        console.log("Categories fetched:", data); // Debug log
        setCategories(["All", ...data]);
      } catch (err) {
        console.error("Error fetching categories:", err);
        // Fallback categories if server fails
        setCategories([
          "All",
          "Web Development",
          "Data Science",
          "Mobile Development",
          "UI/UX Design",
          "Digital Marketing",
        ]);
      }
    };

    fetchCategories();
  }, []);

  // GSAP animation on mount and when courses change
  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".course-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        }
      );
    }
  }, [filteredCourses]);

  // Filter courses
  useEffect(() => {
    const filterCourses = async () => {
      setLoading(true);

      try {
        // Build query parameters
        const params = new URLSearchParams();

        if (selectedCategory !== "All") {
          params.append("category", selectedCategory);
        }

        if (searchTerm.trim()) {
          params.append("search", searchTerm);
        }

        // Fetch filtered data from server
        const response = await fetch(
          `http://localhost:3000/courses?${params.toString()}`
        );
        const data = await response.json();
        setFilteredCourses(data);
      } catch (error) {
        console.error("Error filtering courses:", error);
        // Fallback to client-side filtering if server fails
        let filtered = initialData;

        if (selectedCategory !== "All") {
          filtered = filtered.filter(
            (course) => course.category === selectedCategory
          );
        }

        if (searchTerm.trim()) {
          filtered = filtered.filter((course) =>
            course.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setFilteredCourses(filtered);
      } finally {
        setLoading(false);
      }
    };

    filterCourses();
  }, [selectedCategory, searchTerm, initialData]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Explore Our Courses
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover amazing courses to boost your skills
          </p>
        </div>

        {/* Filters Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 transition-colors duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Search Bar */}
            <div className="lg:col-span-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Courses
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                <input
                  type="text"
                  placeholder="Search by course name..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 transition-colors duration-300"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="lg:col-span-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <Filter className="w-4 h-4 inline-block mr-1" />
                Filter by Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 cursor-pointer transition-colors duration-300"
              >
                {categories.length === 0 ? (
                  <option>Loading categories...</option>
                ) : (
                  categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedCategory !== "All" || searchTerm) && (
            <div className="flex items-center gap-2 mt-4 flex-wrap pt-4 border-t border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Active Filters:
              </span>
              {selectedCategory !== "All" && (
                <span className="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium flex items-center space-x-2">
                  <span>{selectedCategory}</span>
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="hover:text-indigo-900 dark:hover:text-indigo-100 ml-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              )}
              {searchTerm && (
                <span className="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium flex items-center space-x-2">
                  <span>"{searchTerm}"</span>
                  <button
                    onClick={() => setSearchTerm("")}
                    className="hover:text-indigo-900 dark:hover:text-indigo-100 ml-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchTerm("");
                }}
                className="px-3 py-1.5 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-sm font-medium hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {filteredCourses.length}
            </span>{" "}
            {filteredCourses.length === 1 ? "course" : "courses"}
          </p>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchTerm("");
              }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCourses;
