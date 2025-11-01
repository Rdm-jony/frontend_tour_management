"use client"
import DrawerComponent from "@/components/shared/Drawer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddDivisionForm from "./AddDivisionForm";

const AddDivision = () => {
    const [openDrawer, setOpenDrawer] = useState(false)
    return (
        <div>
            <Button className="cursor-pointer" onClick={()=>setOpenDrawer(true)}><Plus /> Add New Division </Button>
            <DrawerComponent open={openDrawer} setOpen={setOpenDrawer}>
                <AddDivisionForm setOpen={setOpenDrawer}/>
            </DrawerComponent>
        </div>
    );
};

export default AddDivision;