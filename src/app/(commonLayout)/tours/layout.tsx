import TourListSidebar from "@/components/modules/Home/Tours/TourListSidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex">
            <TourListSidebar />
            <div className="grow">
                {children}
            </div>
        </div>
    );
};

export default Layout;