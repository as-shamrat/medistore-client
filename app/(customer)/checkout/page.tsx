import { redirect } from "next/navigation"
import CheckoutClient from "./CheckoutClient"
import { getSession } from "@/lib/api/auth"


export default async function CheckoutPage() {
    const session = await getSession()

    if (!session) {
        redirect("/login")
    }

    return <CheckoutClient />
}
