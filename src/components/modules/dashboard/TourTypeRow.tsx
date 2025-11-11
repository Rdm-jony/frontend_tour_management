"use client"
import DrawerComponent from "@/components/shared/Drawer";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Edit } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ITourType } from "@/types/category.type";
import EditTourType from "./EditTourType";

const TourTypeRow = ({ tourType }: { tourType: ITourType }) => {
    const [openDrawer, setOpenDrawer] = useState(false)
    return (
        <TableRow>
            <TableCell className="relative w-12 h-12 overflow-hidden rounded-md">
                <Image
                    src={tourType.image || "/placeholder.png"}
                    alt={tourType.name}
                    fill
                    className="object-cover"
                />
            </TableCell>

            <TableCell className="font-medium text-center">{tourType.name}</TableCell>


            <TableCell className="text-right">
                <Button onClick={() => setOpenDrawer(true)} size="icon" variant="outline">
                    <Edit className="h-4 w-4" />
                </Button>
            </TableCell>
            <DrawerComponent open={openDrawer} setOpen={setOpenDrawer}>
                <EditTourType tourType={tourType} setOpen={setOpenDrawer} />
            </DrawerComponent>
        </TableRow>
    );
};

export default TourTypeRow;