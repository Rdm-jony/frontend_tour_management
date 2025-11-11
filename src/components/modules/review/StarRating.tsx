"use client";

import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  size?: number;
}

const StarRating = ({ value, onChange, size = 24 }: StarRatingProps) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = hover !== null ? star <= hover : star <= value;

        return (
          <Star
            key={star}
            size={size}
            className={`cursor-pointer transition 
              ${isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
            onClick={() => onChange(star)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
