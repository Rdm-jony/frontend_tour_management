"use client"
import DrawerComponent from "@/components/shared/Drawer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddTourForm from "./AddTourForm";

const AddTour = () => {
    const [openDrawer, setOpenDrawer] = useState(false)
    return (
        <div>
            <Button className="cursor-pointer" onClick={() => setOpenDrawer(true)}><Plus /> Add New Tour </Button>
            <DrawerComponent open={openDrawer} setOpen={setOpenDrawer}>
                <AddTourForm setOpen={setOpenDrawer} />
            </DrawerComponent>
        </div>
    );
};

export default AddTour;