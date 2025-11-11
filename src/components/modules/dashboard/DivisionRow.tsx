"use client"
import DrawerComponent from "@/components/shared/Drawer";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { IDivision } from "@/types/division.type";
import { Edit } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import EditDivision from "./EditDivision";

const DivisionRow = ({ division }: { division: IDivision }) => {
    const [openDrawer, setOpenDrawer] = useState(false)
    return (
        <TableRow>
            <TableCell className="relative w-12 h-12 overflow-hidden rounded-md">
                <Image
                    src={division.thumbnail || "/placeholder.png"}
                    alt={division.name}
                    fill
                    className="object-cover"
                />
            </TableCell>

            <TableCell className="font-medium">{division.name}</TableCell>

            <TableCell
                className="max-w-[400px] text-sm text-muted-foreground truncate"
                title={division.description} // shows full text on hover
            >
                {division.description}
            </TableCell>
            <TableCell className="text-center font-semibold">{division.totalTours}</TableCell>

            <TableCell className="text-right">
                <Button onClick={() => setOpenDrawer(true)} size="icon" variant="outline">
                    <Edit className="h-4 w-4" />
                </Button>
            </TableCell>
            <DrawerComponent open={openDrawer} setOpen={setOpenDrawer}>
                <EditDivision division={division} setOpen={setOpenDrawer} />
            </DrawerComponent>
        </TableRow>
    );
};

export default DivisionRow;