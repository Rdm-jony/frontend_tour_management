
import SectionTitle from "@/components/shared/SectionTitle";
import TourCardVertical from "../Tours/TourCardVertical";
import { ITour } from "@/types/tour.type";
import { Button } from "@/components/ui/button";
import Link from "next/link";



const TopDestination = async () => {
    const data = await fetch(`http://localhost:5000/api/v1/tour?averageRating=5`)
    const tours = await data.json()
    return (
        <div className="my-20">
            <SectionTitle
                title="Popular Tours"
                subTitle="An enim nullam tempor gravida donec enim congue magna at pretium purus"
            />
            <div className="grid gap-10 md:grid-cols-3 grid-cols-1">
                {
                    tours?.data?.map((tour: ITour, idx: number) => <TourCardVertical key={idx} tour={tour} />)
                }
            </div>
            <div className="my-10 flex justify-center">
                <Link href='/tours'>
                    <Button className="cursor-pointer">See More</Button>
                </Link>
            </div>
        </div>
    );
};

export default TopDestination;