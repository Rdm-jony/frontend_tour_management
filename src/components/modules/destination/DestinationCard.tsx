import { Button } from "@/components/ui/button";
import { IDivision } from "@/types/division.type";
import Image from "next/image";
import Link from "next/link";

const DestinationCard = ({ division, index }: { division: IDivision, index: number }) => {
    const row = Math.floor(index / 2);
    const spanClass =
        (row % 2 === 0 && index % 2 === 0) || (row % 2 === 1 && index % 2 === 1)
            ? "col-span-2"
            : "";

    return (
        <Link href={`/tours?division=${division._id}`}>
            <div
                className={`relative cursor-pointer overflow-hidden rounded-xl shadow-md h-80 group md:${spanClass}`}
            >
                <Image
                    src={division?.thumbnail ?? ""}
                    alt={division.name ?? "division image"}
                    fill
                    className="object-cover group-hover:scale-125 transform transition-transform duration-500 delay-100 ease-in-out"
                />
                <div className="absolute bg-black/20 inset-0 flex items-end p-10">
                    <div>
                        <p className="text-5xl font-bold text-white">{division?.name}</p>
                        <Button className="font-semibold text-2xl mt-3">{division.totalTours} Tours</Button>
                    </div>
                </div>
            </div></Link>
    );

};

export default DestinationCard;