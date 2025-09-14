"use client"

import { useState, useRef, useEffect } from "react"
import { Pen, Trash } from "@phosphor-icons/react";

type ChatItemProps = {
  chat: { id: string; title: string }
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function ChatItem({ chat, onEdit, onDelete }: ChatItemProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Click outside to close the menu
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative group flex items-center">
      {/* Chat Button */}
      <button
        onClick={() => console.log(`Chat selected: ${chat.id}`)}
        className="flex-1 text-left p-2 rounded-sm hover:bg-blue-200"
      >
        {chat.title}
      </button>

      {/* Three Points */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity font-bold"
      >
        ︙
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-2 top-full mt-1 w-32 rounded-md border bg-white shadow-md text-sm z-20">
          <button
            onClick={() => {
              onEdit(chat.id)
              setOpen(false)
            }}
            className="block w-full text-left px-3 py-2 hover:bg-blue-100 z-10"
          >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <Trash size={18} />
        <span>Edit title</span>
        </div>
          </button>
          <button
            onClick={() => {
              onDelete(chat.id)
              setOpen(false)
            }}
            className="block w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 z-10"
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Pen size={18} />
            <span>Delete chat</span>
            </div>
          </button>
        </div>
      )}
    </div>
  )
}
