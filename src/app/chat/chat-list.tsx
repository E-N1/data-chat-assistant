import { getChats } from "@/lib/actions";

export default async function ChatList() {
  const chats = await getChats();

  if (!chats?.length) return <p className="opacity-70">Noch keine Chats.</p>;

  return (
    <ul className="space-y-2">
      {chats.map((c) => (
        <li key={c.id}>
          <a href={`/chat/${c.id}`} className="underline">
            {c.title}
          </a>
          <span className="ml-2 text-xs opacity-60">
            {new Date(c.createdAt).toLocaleString()}
          </span>
        </li>
      ))}
    </ul>
  );
}