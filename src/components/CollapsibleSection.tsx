"use client";

import { useState } from "react";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  truncate?: boolean;
  truncateLength?: number;
}

export default function CollapsibleSection({
  title,
  children,
  truncate = false,
  truncateLength = 100,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const contentString = typeof children === "string" ? children : "";
  const truncatedContent =
    truncate && contentString.length > truncateLength && !showMore
      ? `${contentString.slice(0, truncateLength)}...`
      : contentString;

  const hasMoreContent =
    truncate && contentString.length > truncateLength && !showMore;

  return (
    <div className="bg-gray-900 p-6 rounded-lg mb-6">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium">{title}</h3>
        <svg
          className={`w-5 h-5 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="mt-2">
          {truncate ? (
            <>
              <p className="text-sm">
                {truncatedContent}
                {hasMoreContent && (
                  <button
                    className="text-blue-400 ml-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMore(true);
                    }}
                  >
                    Show More
                  </button>
                )}
              </p>
              {showMore && (
                <button
                  className="text-blue-400 mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMore(false);
                  }}
                >
                  Show Less
                </button>
              )}
            </>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  );
}