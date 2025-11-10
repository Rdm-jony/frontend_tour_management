import MobileSidebar from "@/components/modules/Tours/MobileSidebar";
import TourListSidebar from "@/components/modules/Tours/TourListSidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:flex min-h-screen">
      <aside className="w-80 border-r border-gray-200 bg-white sticky top-0 md:block hidden">
        <TourListSidebar />

      </aside>
      <aside className="md:hidden">
        <MobileSidebar />

      </aside>

      <main className="flex-1 md:p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
