"use client"

import { useState } from "react"
import Link from "next/link"
import { setToken, setUser } from "@/helper/localStorage"
import { redirect } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
// import { console } from "inspector/promises"
// import { authClient } from "@/lib/auth-client"

export default function LoginPage() {
    const ctx = useAuth();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        console.log({ email, password })
        // API call later
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        console.log('Login Response: ', data)
        if (data.success) {
            // authClient.setToken(data.token)
            console.log('Login successful, token: ', data.data.token)
            // setToken(data.data.token)
            // setUser(data.data.user)
            ctx.saveUserToContext({ ...data.data.user, token: data.data.token })
            redirect("/")
        }

    }


    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
            <div className="w-full max-w-md border rounded-lg p-6">
                <h1 className="text-2xl font-semibold text-center mb-6">
                    Login to your account
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm text-center mt-4">
                    Don’t have an account?{" "}
                    <Link href="/register" className="text-blue-600 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    )
}
