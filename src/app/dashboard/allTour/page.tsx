"use client"
import AddTour from "@/components/modules/dashboard/AddTour";
import TourCardAdmin from "@/components/modules/Tours/TourCardAdmin";
import TourCardSkeleton from "@/components/skeleton/TourCardSkeleton";
import { ITour } from "@/types/tour.type";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then(r => r.json());

const AllTourPage = () => {
    const url = `https://beckend-tour-management.vercel.app/api/v1/tour`;
    const { data, error, isLoading } = useSWR(url, fetcher)
    const tours = data?.data as ITour[]
    return (
        <div>
            <div className="my-5 flex justify-end">
                <AddTour />
            </div>
            <div className="md:p-5 p-0">
                <h2 className="text-lg font-semibold mb-4">{tours?.length} Tours Found</h2>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5 ">
                        {Array(6).fill(null).map((_, i) => <TourCardSkeleton key={i} />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
                        {tours?.map((tour: ITour) => (
                            <TourCardAdmin key={tour._id} tour={tour} />
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default AllTourPage;