import React from "react";

const CourseCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-gray-200 dark:bg-gray-700 skeleton"></div>

      {/* Content Skeleton */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Category Badge */}
        <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full mb-3 skeleton"></div>

        {/* Title */}
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2 skeleton"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-3/4 skeleton"></div>

        {/* Description */}
        <div className="space-y-2 mb-4 flex-grow">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded skeleton"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded skeleton"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 skeleton"></div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded skeleton"></div>
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded skeleton"></div>
        </div>

        {/* Rating & Price */}
        <div className="flex justify-between items-center mb-4">
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded skeleton"></div>
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded skeleton"></div>
        </div>

        {/* Button */}
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg skeleton"></div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;

