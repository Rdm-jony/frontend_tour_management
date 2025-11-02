import AddTour from "@/components/modules/dashboard/AddTour";
import TourCardAdmin from "@/components/modules/Tours/TourCardAdmin";
import { Button } from "@/components/ui/button";
import { ITour } from "@/types/tour.type";
import { Plus } from "lucide-react";

const AllTour = async () => {
    const res = await fetch('http://localhost:5000/api/v1/tour', { next: { tags: ["tour"] } })
    const data = await res.json()
    const tours = data.data as ITour[]
    return (
        <div>
            <div className="my-5 flex justify-end">
                <AddTour />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
                {tours?.map((tour: ITour) => (
                    <TourCardAdmin key={tour._id} tour={tour} />
                ))}
            </div>

        </div>
    );
};

export default AllTour;