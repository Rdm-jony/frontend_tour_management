/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import TourCard from "@/components/modules/Tours/TourCard";
import TourCardSkeleton from "@/components/skeleton/TourCardSkeleton";
import { ITour } from "@/types/tour.type";
import TourCardVertical from "./TourCardVertical";

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function ToursClient({ initialData }: { initialData: any }) {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const url = `http://localhost:5000/api/v1/tour?${queryString}`;

  const { data, isLoading } = useSWR(url, fetcher, {
    fallbackData: initialData,
    revalidateOnFocus: false,
  });

  const tours = data?.data ?? [];

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">{tours.length} Tours Found</h2>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
          {Array(6).fill(null).map((_, i) => <TourCardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
          {tours.map((tour: ITour) => (
            <>
              <div className="hidden md:block">
                <TourCard key={tour._id} tour={tour} />
              </div>
              <div className="md:hidden">
                <TourCardVertical key={tour._id} tour={tour} />
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
}
