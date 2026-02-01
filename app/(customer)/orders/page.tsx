import { getSession } from "@/lib/api/auth"
import { redirect } from "next/navigation"
import OrdersClient from "./OrdersClient"


export default async function OrdersPage() {
    const session = await getSession()

    if (!session) {
        redirect("/login")
    }

    return <OrdersClient />
}

