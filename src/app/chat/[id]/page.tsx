import { getChat } from "@/lib/actions";
import MessageComposer from "./composer";

export default async function ChatPage({ params }: { params: { id: string } }) {
  const chat = await getChat(params.id);
  if (!chat) return <div className="p-6">Chat nicht gefunden.</div>;

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-semibold">{chat.title}</h1>

      <section className="space-y-3">
        {chat.messages.map((m) => (
          <div key={m.id} className="rounded-xl border p-3">
            <div className="text-xs opacity-60 mb-1">{m.role}</div>
            <div>{m.content}</div>
          </div>
        ))}
      </section>

      <MessageComposer chatId={chat.id} />
    </main>
  );
}