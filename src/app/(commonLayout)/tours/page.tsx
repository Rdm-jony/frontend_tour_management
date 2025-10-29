"use client"
import useSWR from "swr";

import TourCard from "@/components/modules/Home/Tours/TourCard";
import { ITour } from "@/types/tour.type";
import { useSearchParams } from "next/navigation";
import TourCardSkeleton from "@/components/skeleton/TourCardSkeleton";

const fetcher = (url: string) => fetch(url).then(r => r.json());

const Tours = () => {
    const searchParams = useSearchParams();
    const queryString = searchParams.toString();
    const url = `http://localhost:5000/api/v1/tour?${queryString}`;

    const { data: tours, error, isLoading } = useSWR(url, fetcher)
    return (
        <div className="p-5">
            <h2 className="text-lg font-semibold mb-4">{tours?.data.length} Tours Found</h2>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5 ">
                    {Array(6).fill(null).map((_, i) => <TourCardSkeleton key={i} />)}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
                    {tours?.data?.map((tour: ITour) => (
                        <TourCard key={tour._id} tour={tour} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Tours;