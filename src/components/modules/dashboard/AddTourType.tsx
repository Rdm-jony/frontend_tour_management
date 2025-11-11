"use client"
import DrawerComponent from "@/components/shared/Drawer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddTourTypeForm from "./AddTourTypeForm";

const AddTourType = () => {
    const [openDrawer, setOpenDrawer] = useState(false)
    return (
        <div>
            <Button className="cursor-pointer" onClick={()=>setOpenDrawer(true)}><Plus /> Add Tour Type </Button>
            <DrawerComponent open={openDrawer} setOpen={setOpenDrawer}>
                <AddTourTypeForm setOpen={setOpenDrawer}/>
            </DrawerComponent>
        </div>
    );
};

export default AddTourType;