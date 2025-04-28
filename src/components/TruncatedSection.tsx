"use client";

import { useState } from "react";

interface TruncatedSectionProps {
  title: string;
  content: string;
  truncateLength?: number;
}

export default function TruncatedSection({
  title,
  content,
  truncateLength = 100,
}: TruncatedSectionProps) {
  const [showMore, setShowMore] = useState(false);

  const truncatedContent =
    content.length > truncateLength && !showMore
      ? `${content.slice(0, truncateLength)}...`
      : content;

  const hasMoreContent = content.length > truncateLength && !showMore;

  return (
    <div className="bg-gray-900 p-6 rounded-lg mb-6">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-sm">
        {truncatedContent}
        {hasMoreContent && (
          <button
            className="text-blue-400 ml-2"
            onClick={() => setShowMore(true)}
          >
            Show More
          </button>
        )}
      </p>
      {showMore && (
        <button
          className="text-blue-400 mt-2"
          onClick={() => setShowMore(false)}
        >
          Show Less
        </button>
      )}
    </div>
  );
}