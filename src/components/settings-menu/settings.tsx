"use client";
import { CalculatorIcon, GearIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useState } from "react";

export function SettingsMenu() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [tokensUsed, setTokensUsed] = useState("Coming soon"); //TODO: Dynamic

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center p-3 rounded-sm hover:bg-blue-200 gap-2">
        <span><GearIcon size={20} /></span>
        Settings
      </button>

                    
        {/* Overlay */}
        {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          //close when clicking outside
          onClick={() => setOpen(false)} 
        >
          {/* Menü */}
          <div
            
            className="bg-white rounded-xl shadow-xl w-96 p-4 relative"
            // Prevent closing when clicking inside
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Header */}
            <div className="pb-5 flex items-center justify-between mb-4">
            {/* Left: traffic-light buttons */}
            <div className="flex gap-2">

            <button
            onClick={() => setOpen(false)}
            className="w-3 h-3 rounded-full bg-red-500 relative hover:bg-red-500 focus:outline-none"
          >
            <span className="absolute inset-0 flex items-center justify-center 
                            text-stone-700 text-[10px] font-bold opacity-0 
                            hover:opacity-100 transition-opacity duration-150">
              ×
            </span>
          </button>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>

            {/* Right: Title */}
            <h2 className="text-lg pr-15 font-semibold text-gray-800">Settings</h2>

            <div className="w-3" />
          </div>


            {/* Dark / Light Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex w-full items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 gap-2"
            >
              {darkMode ? <MoonIcon /> : <SunIcon />}
              <span className="flex-1 text-left">
                {darkMode ? "Dark Mode" : "Light Mode"}
              </span>
            </button>

            {/* Token Usage */}
            <div className="flex items-center w-full p-2 mt-2 rounded-md bg-gray-100 dark:bg-gray-800 gap-2">
              <CalculatorIcon />
              <span className="flex-1 text-left">Count total tokens</span>
              <span className="font-mono">{tokensUsed}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}