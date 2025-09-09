import { prisma } from "@/lib/prisma";

export default async function ChatPage({ params }: { params: { id: string } }) {
  const chat = await prisma.chat.findUnique({
    where: { id: params.id },
    include: { messages: true },
  });

  if (!chat) return <div>Chat not found</div>;

  return (
    <div className="p-6">
      <h1 className="text-lg font-bold mb-4">{chat.title}</h1>

      <div className="space-y-4">
        {chat.messages.map((msg) => (
          <div key={msg.id} className={msg.role === "user" ? "text-blue-600" : "text-gray-800"}>
            <b>{msg.role}:</b> {msg.content}
          </div>
        ))}
      </div>
    </div>
  );
}
