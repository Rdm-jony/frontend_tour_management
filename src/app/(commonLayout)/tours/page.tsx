import TourCard from "@/components/modules/Home/Tours/TourCard";
import { ITour } from "@/types/tour.type";

const Tours = async () => {
    const data = await fetch("http://localhost:5000/api/v1/tour")
    const tours = await data.json()
    return (
        <div>
            <p>Tours</p>
            <div className="p-5">
                {
                    tours?.data?.map((tour: ITour) => <TourCard key={tour._id} tour={tour} />)
                }
            </div>
        </div>
    );
};

export default Tours;