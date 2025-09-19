"use client";
import { CreateChatForm } from "@/lib/create-chat-form";
import { useChats } from "@/lib/useChats";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const { chats, error } = useChats();

  if (error) {
    console.error("Error loading chats:", error);
    return <div>Failed to load chats</div>;
  }
  if (!chats) {
    console.log("Chats are still loading...");
    return <div>Loading chats...</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-6">
      <div className="flex text-center">
        <h1 className="text-2xl font-semibold">Let's create something big!</h1>
        <CreateChatForm />
      </div>



    </main>
  );
}
