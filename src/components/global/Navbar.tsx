"use client";
import {  IndianRupee } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { BounceLoader } from "react-spinners";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center p-6 bg-white shadow-sm">
      <div className="flex items-center space-x-2">
        <IndianRupee className="h-8 w-8 text-indigo-600" />
        <span className="text-2xl font-bold text-gray-800">Financely</span>
      </div>

      <div className="space-x-4">
        <button
          onClick={() => {
            router.push("/add");
          }}
          className="px-6 py-2 cursor-pointer bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Add Transaction
        </button>
      
      </div>
    </nav>
  );
};

export default Navbar;
