import TourListSidebar from "@/components/modules/Tours/TourListSidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-80 border-r border-gray-200 bg-white sticky top-0 h-screen overflow-y-auto">
        <TourListSidebar />
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
