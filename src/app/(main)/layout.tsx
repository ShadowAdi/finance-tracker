import Navbar from "@/components/global/Navbar";
import React, { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
};

export default MainLayout;
