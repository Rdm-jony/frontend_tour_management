import { Footer2 } from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer2/>
        </>
    );
};

export default Layout;