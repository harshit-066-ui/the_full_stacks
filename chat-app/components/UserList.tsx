"use client";
type UserListProps = {
  users: string[];
};

export default function UserList({ users }: UserListProps) {
  return (
    <div className="p-2 border-t text-sm text-gray-600">
      <strong>Online now:</strong>{" "}
      {users.length ? users.join(", ") : "No one is online 😢"}
    </div>
  );
}
