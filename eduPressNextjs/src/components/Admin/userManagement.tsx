"use client";
import { useEffect, useState } from "react";
import { fetchUsers } from "@/handlers/Admin/Users/userFetchHandlers";
import { handleDeleteUser } from "@/handlers/Admin/Users/userHandlers";
import { User } from "@/services/types";

export default function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>(null);
    const getInitials = (name: string): string => {
        if (!name) return "NA";
        const parts = name.split(" ");
        return parts
            .map((part) => part.charAt(0).toUpperCase())
            .slice(0, 2)
            .join("");
    };
    useEffect(() => {
        fetchUsers(setUsers, setError);
    }, []);

    return (
        <div className="text-white">
            {error && <p className="mb-4 text-red-500">{error}</p>}
            {users.length > 0 ? (
                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {users.map((user) => (
                        <div key={`user-${user.id}`} className="flex flex-col bg-gray-700 shadow-md p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center">
                                    <div className="flex justify-center items-center bg-gray-500 mr-2 rounded-full w-10 h-10 font-bold text-white">
                                        {getInitials(user.username || user.email)}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{user.username || "No Name"}</p>
                                        <p className="text-sm">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleDeleteUser(user.id, users, setUsers, setError)}
                                        className="text-red-600 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-1 text-sm">
                                <p>
                                    <strong>Role:</strong> {user.role}
                                </p>
                                <p>
                                    <strong>Email Verified:</strong> {user.emailVerified ? "Yes" : "No"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
