import { IReview } from '@/types/review.type';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils'; 

const ReviewCard = ({ review }: { review: IReview }) => {
  const pathname = usePathname();

  return (
    <div
      key={review._id}
      className="border rounded-lg p-4 shadow-sm bg-white flex gap-4 relative group"
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

      <div className="flex-1 relative">
        <div className="flex items-center justify-between mb-1">
          <p className="font-medium text-gray-800">{review.user?.name}</p>
          <p className="text-sm text-gray-500">
            {review.createdAt && new Date(review.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "w-4 h-4",
                i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              )}
            />
          ))}
        </div>
        <div className="relative">
          <p
            className={cn(
              "text-gray-700",
              pathname === "/" ? "line-clamp-2 overflow-hidden" : ""
            )}
          >
            {review.comment}
          </p>

          {pathname === "/" && (
            <span className="absolute left-0 top-0 invisible group-hover:visible bg-black text-white text-sm rounded px-2 py-1 z-10 whitespace-pre-line shadow-lg">
              {review.comment}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
