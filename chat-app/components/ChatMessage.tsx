"use client";
type ChatMessageProps = {
  id?: number;
  type: "chat" | "system";
  sender?: string;
  content: string;
  createdAt?: string;
  isOwn?: boolean;
};

export default function ChatMessage({
  type,
  sender,
  content,
  createdAt,
  isOwn = false,
}: ChatMessageProps) {
  const bgClass =
    type === "system"
      ? "bg-yellow-100 italic text-gray-700"
      : isOwn
      ? "bg-blue-100 self-end"
      : "bg-gray-100";

  return (
    <div className={`px-4 py-2 rounded-lg flex justify-between items-center ${bgClass}`}>
      <div>
        {sender && <strong>{sender}: </strong>}
        {content}
        {createdAt && (
          <span className="text-gray-400 text-xs ml-2">
            {new Date(createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        )}
      </div>
    </div>
  );
}
