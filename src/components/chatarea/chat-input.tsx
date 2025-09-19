"use client";
import React, { useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";

interface ChatInputProps {
  placeholder: string;
  buttonLabel: string;
  onSubmit: (value: string) => Promise<void> | void;
}

export function ChatInput({ placeholder, buttonLabel, onSubmit }: ChatInputProps) {
  const [value, setValue] = useState("");
  const { state, isMobile } = useSidebar();

  const sidebarWidthDesktop = 280; // gleiche Maße wie --sidebar-width
  const marginLeft = isMobile ? 0 : state === "collapsed" ? 60 : sidebarWidthDesktop;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value);
    setValue("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed bottom-0 left-0 right-0 flex gap-4 p-7 gap-8 bg-white"
      style={{ marginLeft, transition: "margin-left 0.2s ease" }}
    >
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 border rounded-full p-2 px-4"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 rounded-xl hover:bg-blue-700"
        
      >
        {buttonLabel}
      </button>
    </form>
  );
}
