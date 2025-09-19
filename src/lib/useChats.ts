import { v4 as uuidv4 } from 'uuid';
import useSWR from "swr";


// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());



export function useChats() {
    const { data: chats, error, mutate } = useSWR("/api/chats", fetcher);
    const today = new Date();
    const now = today.toISOString();
  
    const createChat = async (title: string, message?: string) => {
      const response = await fetch("/api/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, message }),
      });
      console.log("Response from /api/chats:", response);
  
      if (!response.ok) throw new Error("Failed to create chat");
      const newChat = await response.json();
  
      mutate([...(chats || []), newChat], false);
      return newChat;
    };
  
    return { chats, error, createChat };
  }