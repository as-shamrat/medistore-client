"use client";

import { Button } from "@/components/ui/button";
import { updateUserStatus } from "@/lib/fetcher";
import { useState } from "react";

type User = {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "SELLER" | "CUSTOMER";
    status: "ACTIVE" | "BANNED";
    createdAt: string;
};

export default function UsersTable({ users }: { users: User[] }) {
    const [loadingId, setLoadingId] = useState<string | null>(null);
    console.log(users)
    async function toggleStatus(user: User) {
        const newStatus = user.status === "ACTIVE" ? "BANNED" : "ACTIVE";

        const confirm = window.confirm(
            `Are you sure you want to ${newStatus === "BANNED" ? "ban" : "activate"} this user?`
        );
        if (!confirm) return;

        try {
            setLoadingId(user.id);
            console.log({ status: newStatus })
            const res = await updateUserStatus(user.id as string, { status: newStatus })

            if (!res.success) throw new Error("Failed to update user");

            window.location.reload(); // simple & safe for now
        } catch (err) {
            alert("Something went wrong");
        } finally {
            setLoadingId(null);
        }
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-gray-700">
                    <tr>
                        <th className="px-4 py-3 text-left">Name</th>
                        <th className="px-4 py-3 text-left">Email</th>
                        <th className="px-4 py-3">Role</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-t">
                            <td className="px-4 py-3">{user.name}</td>
                            <td className="px-4 py-3">{user.email}</td>

                            <td className="px-4 py-3 text-center">
                                <span className="px-2 py-1 rounded bg-gray-200 text-xs">
                                    {user.role}
                                </span>
                            </td>

                            <td className="px-4 py-3 text-center">
                                <span
                                    className={`px-2 py-1 rounded text-xs font-medium ${user.status === "ACTIVE"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {user.status}
                                </span>
                            </td>

                            <td className="px-4 py-3 text-center">
                                {user.role === "ADMIN" ? (
                                    <span className="text-gray-400 text-xs">Not allowed</span>
                                ) : (
                                    <Button
                                        disabled={loadingId === user.id}
                                        onClick={() => toggleStatus(user)}
                                        className={`px-3 py-1 rounded text-xs font-medium transition ${user.status === "ACTIVE"
                                            ? "bg-red-600 text-black hover:bg-red-700"
                                            : "bg-green-600 text-black hover:bg-green-700"
                                            } disabled:opacity-50`}
                                    >
                                        {loadingId === user.id
                                            ? "Processing..."
                                            : user.status === "ACTIVE"
                                                ? "Ban"
                                                : "Activate"}
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
