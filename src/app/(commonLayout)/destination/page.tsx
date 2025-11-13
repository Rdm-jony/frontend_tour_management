import DestinationCard from "@/components/modules/destination/DestinationCard";
import { IDivision } from "@/types/division.type";

const DestinationPage = async () => {
    const data = await fetch("https://beckend-tour-management.vercel.app/api/v1/division", {
        cache: "no-store",
    });
    const divisions = await data.json();

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {divisions?.data?.map((division: IDivision, index: number) => <DestinationCard
                key={division._id}
                division={division}
                index={index}
            />)}
        </div>
    );
};

export default DestinationPage;
