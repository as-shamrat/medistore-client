"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { updateSellerOrder } from "@/lib/fetcher"

const STATUS_FLOW: Record<string, string[]> = {
    PENDING: ["CONFIRMED", "CANCELLED"],
    CONFIRMED: ["SHIPPED"],
    SHIPPED: ["DELIVERED"],
}

export default function OrderStatusClient({
    orderId,
    currentStatus,
}: {
    orderId: string
    currentStatus: string
}) {
    const router = useRouter()
    const [status, setStatus] = useState(currentStatus)
    const [loading, setLoading] = useState(false)

    const allowedStatuses = STATUS_FLOW[currentStatus] || []

    async function updateStatus() {
        setLoading(true)

        await updateSellerOrder(orderId, { status })

        setLoading(false)
        router.refresh()
    }

    return (
        <div className="bg-white border rounded-lg p-4">
            <h2 className="font-semibold mb-3">Update Order Status</h2>

            <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="border rounded px-3 py-2 mr-3"
            >
                <option value={currentStatus}>{currentStatus}</option>
                {allowedStatuses.map(s => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>

            <button
                onClick={updateStatus}
                disabled={loading || status === currentStatus}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
                {loading ? "Updating..." : "Update"}
            </button>
        </div>
    )
}
