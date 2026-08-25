import React from "react";

const CourseCardSkeleton = () => {
  return (
    <div className="sand-card flex flex-col h-full overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="h-48 bg-[var(--surface-soft)] dark:bg-[var(--surface-dark-soft)] skeleton"></div>

      {/* Content Skeleton */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="h-6 w-24 bg-[var(--surface-soft)] dark:bg-[var(--surface-dark-soft)] rounded-full mb-3 skeleton"></div>
        <div className="h-6 bg-[var(--surface-soft)] dark:bg-[var(--surface-dark-soft)] rounded mb-2 skeleton"></div>
        <div className="h-6 bg-[var(--surface-soft)] dark:bg-[var(--surface-dark-soft)] rounded mb-4 w-3/4 skeleton"></div>
        <div className="space-y-2 mb-4 flex-grow">
          <div className="h-4 bg-[var(--surface-soft)] dark:bg-[var(--surface-dark-soft)] rounded skeleton"></div>
          <div className="h-4 bg-[var(--surface-soft)] dark:bg-[var(--surface-dark-soft)] rounded skeleton"></div>
          <div className="h-4 bg-[var(--surface-soft)] dark:bg-[var(--surface-dark-soft)] rounded w-5/6 skeleton"></div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 w-20 bg-[var(--surface-soft)] dark:bg-[var(--surface-dark-soft)] rounded skeleton"></div>
          <div className="h-4 w-24 bg-[var(--surface-soft)] dark:bg-[var(--surface-dark-soft)] rounded skeleton"></div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="h-5 w-16 bg-[var(--surface-soft)] dark:bg-[var(--surface-dark-soft)] rounded skeleton"></div>
          <div className="h-6 w-20 bg-[var(--surface-soft)] dark:bg-[var(--surface-dark-soft)] rounded skeleton"></div>
        </div>
        <div className="h-10 bg-[var(--surface-soft)] dark:bg-[var(--surface-dark-soft)] rounded-full skeleton"></div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
