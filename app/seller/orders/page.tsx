import { getSellerOrders } from "@/lib/fetcher"
import SellerOrdersClient from "./SellerOrdersClient"

// async function getSellerOrders() {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seller/orders`, {
//         credentials: "include",
//         cache: "no-store",
//     })

//     if (!res.ok) throw new Error("Failed to fetch orders")

//     return res.json()
// }

export default async function SellerOrdersPage() {
    const response = await getSellerOrders()
    console.log({ response })
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Seller Orders</h1>

            <SellerOrdersClient orders={response.data.orders} />
        </div>
    )
}
