import React, { useEffect, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import gsap from "gsap";

const AllCourses = () => {
  const data = useLoaderData();
  const gridRef = useRef(null);

  // GSAP animation on mount
  useEffect(() => {
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
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Explore Our Courses
      </h1>

      <div
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {data.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default AllCourses;
