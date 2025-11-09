import { IReview } from '@/types/review.type';
import { Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const ReviewCard = ({review}:{review:IReview}) => {
    return (
        <div
            key={review._id}
            className="border rounded-lg p-4 shadow-sm bg-white flex gap-4"
        >
            {/* User Avatar */}
            <div className="flex-shrink-0">
                {review.user?.picture ? (
                    <Image
                        src={review.user.picture}
                        alt={review.user.name}
                        width={50}
                        height={50}
                        className="rounded-full object-cover border"
                    />
                ) : (
                    <div className="w-[50px] h-[50px] rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
                        {review.user?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                )}
            </div>

            {/* Review Content */}
            <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-800">{review.user?.name}</p>
                    <p className="text-sm text-gray-500">
                        {review.createdAt && new Date(review.createdAt).toLocaleDateString()}
                    </p>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${i < review.rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                        />
                    ))}
                </div>

                {/* Comment */}
                <p className="text-gray-700">{review.comment}</p>
            </div>
        </div>
    );
};

export default ReviewCard;