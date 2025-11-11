"use client";

import { TableRow, TableCell } from "@/components/ui/table";
import { ITour } from "@/types/tour.type"; // define your tour type accordingly
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Edit, Info, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DrawerComponent from "@/components/shared/Drawer";
import EditTour from "./EditTour";

interface TourRowProps {
    tour: ITour;
}

const TourRow = ({ tour }: TourRowProps) => {
    const [openDrawer, setOpenDrawer] = useState(false)
    const router = useRouter()
    const handleNavigate = () => {
        router.push(`/tour/${tour._id}`)
    }
    return (
        <>
            <TableRow>
                <TableCell className="relative w-16 h-16">
                    {tour.images?.[0] ? (
                        <Image
                            src={tour.images[0]}
                            alt={tour.title}
                            fill
                            className="object-cover rounded-md"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                            No Image
                        </div>
                    )}
                </TableCell>

                <TableCell><span className="font-medium hover:text-primary cursor-pointer" onClick={handleNavigate}>
                    {tour.title}
                </span></TableCell>

                <TableCell className="max-w-xs truncate">{tour.description}</TableCell>
                <TableCell>{tour.tourType?.name}</TableCell>
                <TableCell>{tour.location}, {tour.division?.name}</TableCell>
                <TableCell className="flex gap-2 justify-end">
                  

                </TableCell>

            </TableRow>
            {
                <DrawerComponent open={openDrawer} setOpen={setOpenDrawer}>
                    <EditTour setOpen={setOpenDrawer} tour={tour}/>
                </DrawerComponent>
            }
        </>


    );
};

export default TourRow;
