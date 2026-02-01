import { redirect } from "next/navigation"

import CartClient from "./CartClient"
import { getSession } from "@/lib/api/auth"

export default async function CartPage() {
    const session = await getSession()
    console.log({ session })
    if (!session) {
        redirect("/login")
    }

    return <CartClient />
}
