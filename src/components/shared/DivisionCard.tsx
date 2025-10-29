import {
    Card,
    CardContent,

} from "@/components/ui/card"
import { IDivision } from "@/types/division.type";
import Image from "next/image";
import imagePlaceHolder from "@/assets/image-gallery.png"

const DivisionCard = ({ division }: { division: IDivision }) => {
    return (
        <Card className="p-0">
            <CardContent className="group p-0">
                <div className="relative overflow-hidden rounded-t-lg h-80 w-full">
                    <Image
                        src={division.thumbnail ?? imagePlaceHolder}
                        alt={division.name || "Division image"}
                        fill
                        className="object-cover   group-hover:scale-120 transition duration-500 ease-in-out"
                        priority
                    />
                    <div className="group-hover:absolute  group-hover:translate-y-0 translate-y-full inset-0 bg-black opacity-60 transition-transform duration-500 ease-in-out">
                    </div>
                    <div className="group-hover:absolute p-5 text-justify transition-transform duration-500 ease-in-out">
                        <p className="text-secondary">{division.description}</p>
                        <p className="text-xl font-semibold text-secondary my-5 text-center">{division.totalTours} Tours</p>
                    </div>

                </div>

                <div className="p-5">
                    <p className="font-semibold text-xl mt-2">{division.name}</p>
                </div>
            </CardContent>

        </Card>
    );
};

export default DivisionCard;