/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IReview } from "@/types/review.type";
import useSWR, { mutate } from "swr";
import ReviewCard from "./ReviewCard";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import StarRating from "./StarRating";
import { showToast } from "nextjs-toast-notify";
import { addReview, updateReview } from "@/utils/review";
import { useUser } from "@/hooks/useUser";
import ButtonLoader from "@/components/shared/ButtonLoader";
import Link from "next/link";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((r) => r.json());

const TourReviews = ({ tourId }: { tourId: string }) => {
  const url = `http://localhost:5000/api/v1/review/${tourId}`;
  const { data, error, isLoading } = useSWR(url, fetcher);
  const { user } = useUser();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [existingReview, setExistingReview] = useState<IReview | null>(null);

  const reviews = data?.data as IReview[];

  useEffect(() => {
    if (user && reviews?.length > 0) {
      const found = reviews.find((rev) => rev.user?._id === user._id);
      if (found) {
        setExistingReview(found);
        setRating(found.rating);
        setComment(found.comment);
      } else {
        setExistingReview(null);
        setRating(0);
        setComment("");
      }
    }
  }, [user, reviews]);

  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !comment.trim()) {
      showToast.error("Please select a rating and write a comment");
      return;
    }

    try {
      setLoading(true);
      const result = await addReview({ tour: tourId, rating, comment });
      if (result.success) {
        showToast.success("Review added successfully!");
        setRating(0);
        setComment("");
        mutate(url);
      }
    } catch (err: any) {
      showToast.error(err.message || "Failed to add review");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!existingReview?._id) return;

    if (!rating || !comment.trim()) {
      showToast.error("Please select a rating and write a comment");
      return;
    }

    try {
      setLoading(true);
      const result = await updateReview({ _id: existingReview._id, rating, comment });
      if (result.success) {
        showToast.success("Review updated successfully!");
        mutate(url);
      }

    } catch (err: any) {
      showToast.error(err.message || "Failed to update review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 mt-8">
      <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>

      {
        user ? <form
          onSubmit={existingReview ? handleUpdateReview : handleAddReview}
          className="border rounded-lg p-4 shadow-sm bg-white space-y-4"
        >
          <p className="font-medium text-gray-800">
            {existingReview ? "Update Your Review" : "Add Your Review"}
          </p>

          <StarRating value={rating} onChange={setRating} size={28} />

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full border rounded-lg p-2 text-gray-700 focus:ring focus:ring-yellow-200"
            rows={3}
          />
          {
            loading ? <ButtonLoader /> :
              existingReview ? <Button type="submit">Update Review</Button> : <Button type="submit">Add Review</Button>
          }

        </form> : <p>You must be <Link href="/signIn" className="font-semibold text-primary">logged in</Link> to post or update a review.</p>
      }

      {isLoading && <p className="text-gray-500">Loading reviews...</p>}
      {error && <p className="text-red-500">Failed to load reviews</p>}
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => <ReviewCard key={review._id} review={review} />)
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}
    </div>
  );
};

export default TourReviews;
