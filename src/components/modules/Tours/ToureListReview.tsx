"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter, useSearchParams } from "next/navigation";
import { Star } from "lucide-react";

const ratings = [
    { value: "all" },
    { value: "5" },
    { value: "4" },
    { value: "3" },
    { value: "2" },
    { value: "1" },
];

const TourListReview = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const selectedRating = searchParams.get("averageRating") || "all";

    const handleRatingChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value === "all") {
            params.delete("averageRating");
        } else {
            params.set("averageRating", value);
        }

        const queryString = params.toString();
        router.push(queryString ? `?${queryString}` : "/tours");
    };

    return (
        <div>
            <h3 className="my-5 font-bold">Filter by Review</h3>
            <RadioGroup onValueChange={handleRatingChange} value={selectedRating}>
                {ratings.map((rating) => (
                    <div key={rating.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={rating.value} id={rating.value} />
                        <Label
                            htmlFor={rating.value}
                            className={`flex items-center gap-1 ${selectedRating === rating.value ? "text-primary" : ""
                                }`}
                        >
                            {
                                rating.value == "all" && <span>All</span>
                            }
                            {rating.value !== "all" && (
                                <>
                                    {Array.from({ length: Number(rating.value) }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    ))}
                                </>
                            )}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};

export default TourListReview;
