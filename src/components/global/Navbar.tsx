"use client";
import { Activity } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { BounceLoader } from "react-spinners";

const Navbar = () => {
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center p-6 bg-white shadow-sm">
      <div className="flex items-center space-x-2">
        <Activity className="h-8 w-8 text-indigo-600" />
        <span className="text-2xl font-bold text-gray-800">Korai Health</span>
      </div>

      <div className="space-x-4">
        <button
          onClick={() => {
            router.push("/");
          }}
          className="px-6 py-2 cursor-pointer bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Add Transaction
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          className="px-6 py-2 cursor-pointer border-indigo-700 border text-indigo-700 rounded-lg transition-colors bg-white"
        >
          Dashboard
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
