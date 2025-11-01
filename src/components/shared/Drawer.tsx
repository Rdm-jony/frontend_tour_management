import {
    Drawer,
    DrawerContent,
} from "@/components/ui/drawer"
import React from "react";

const DrawerComponent = ({ open, setOpen, children }: { open: boolean, setOpen: (bool: boolean) => void, children: React.ReactNode }) => {
    return (
        <Drawer open={open} onOpenChange={setOpen} direction="right">
            <DrawerContent>
                {children}
            </DrawerContent>
        </Drawer>
    );
};

export default DrawerComponent;