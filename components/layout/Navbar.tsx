'use client'
import { authClient } from "@/lib/auth-client";


import Link from "next/link"
import { redirect } from "next/navigation";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { getUser } from "@/helper/localStorage";
import { useAuth } from "@/context/AuthContext";



export default function Navbar() {
    // const [session, setSession] = useState<Session>(null);
    const ctx = useAuth();
    const { user } = ctx
    console.log('Auth context in Navbar: ', ctx)
    // const [toBeFetched, setToBeFetched] = useState(true)


    // useEffect(() => {
    //     let active = true;

    //     // authClient.getSession().then(({ data }) => {
    //     //     console.log({ data })
    //     //     if (active) {
    //     //         setSession(data);

    //     //     }
    //     // });
    //     const user = getUser();
    //     setUser(user)

    //     return () => {
    //         active = false;
    //     };
    // }, [toBeFetched]);

    async function handleLogout() {
        console.log('logging out')
        // await authClient.signOut()
        // setToBeFetched(toBeFetched => !toBeFetched)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        });
        const data = await response.json();
        console.log('Logout Response: ', data)
        if (data.success) {
            console.log('Logout successful')
            ctx.removeUserFromContext()
            // authClient.clearToken()
            redirect('/login')
        }

    }
    console.log('Current user in Navbar: ', user)
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
                        user?.role === 'CUSTOMER' && <>
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
                        user?.role === 'SELLER' && <>
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
                        user?.role === 'ADMIN' && <>
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
                        user ? <>
                            <span>Hello, {user.name}</span>
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
