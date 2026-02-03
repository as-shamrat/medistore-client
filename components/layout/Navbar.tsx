'use client'
import { authClient } from "@/lib/auth-client";


import Link from "next/link"
import { redirect } from "next/navigation";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type Session =
    Awaited<ReturnType<typeof authClient.getSession>>["data"];

export default function Navbar() {
    const [session, setSession] = useState<Session>(null);
    const [toBeFetched, setToBeFetched] = useState(true)

    console.log(session)
    useEffect(() => {
        let active = true;

        authClient.getSession().then(({ data }) => {
            console.log({ data })
            if (active) {
                setSession(data);

            }
        });

        return () => {
            active = false;
        };
    }, [toBeFetched]);

    async function handleLogout() {
        console.log('logging out')
        await authClient.signOut()
        setToBeFetched(toBeFetched => !toBeFetched)
        redirect('/login')
    }
    return (
        <header className="border-b bg-white">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="text-xl font-bold text-blue-600">
                    MediStore
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-6">
                    <Link
                        href="/shop"
                        className="text-gray-700 hover:text-blue-600 transition"
                    >
                        Shop
                    </Link>
                    {
                        session?.user.role === 'CUSTOMER' && <>
                            <Link
                                href="/cart"
                                className="text-gray-700 hover:text-blue-600 transition"
                            >
                                Cart
                            </Link>
                            <Link
                                href="/orders"
                                className="text-gray-700 hover:text-blue-600 transition"
                            >
                                Orders
                            </Link>
                            <Link
                                href="/profile"
                                className="text-gray-700 hover:text-blue-600 transition"
                            >
                                Profile
                            </Link>
                        </>
                    }
                    {
                        session?.user.role === 'SELLER' && <>
                            <Link
                                href="/seller/dashboard"
                                className="text-gray-700 hover:text-blue-600 transition"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/seller/medicines"
                                className="text-gray-700 hover:text-blue-600 transition"
                            >
                                Medicines
                            </Link>
                            <Link
                                href="/seller/medicines/add"
                                className="text-gray-700 hover:text-blue-600 transition"
                            >
                                Add Medicines
                            </Link>
                            <Link
                                href="/seller/orders"
                                className="text-gray-700 hover:text-blue-600 transition"
                            >
                                Orders
                            </Link>
                        </>
                    }
                    {
                        session?.user.role === 'ADMIN' && <>
                            <Link
                                href="/admin/orders"
                                className="text-gray-700 hover:text-blue-600 transition"
                            >
                                Orders
                            </Link>
                            <Link
                                href="/admin/users"
                                className="text-gray-700 hover:text-blue-600 transition"
                            >
                                Users
                            </Link>
                            <Link
                                href="/admin/categories"
                                className="text-gray-700 hover:text-blue-600 transition"
                            >
                                Categories
                            </Link></>
                    }

                    {
                        session?.user ? <>
                            <span>Hello, {session.user.name}</span>
                            <Button onClick={handleLogout}
                                className="px-3 py-1 bg-red-500 text-black rounded" variant="outline">Logout</Button>
                        </> : <><Link
                            href="/login"
                            className="text-gray-700 hover:text-blue-600 transition"
                        >
                            Login
                        </Link>

                            <Link
                                href="/register"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                Register
                            </Link></>
                    }

                </nav>
            </div >
        </header >
    )
}
