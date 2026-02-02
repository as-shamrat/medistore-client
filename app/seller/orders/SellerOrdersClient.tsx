"use client"

import Link from "next/link"

export default function SellerOrdersClient({ orders }: { orders: any[] }) {
    if (!orders.length) {
        return <p className="text-gray-500">No orders found.</p>
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-100 text-left">
                    <tr>
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Customer</th>
                        <th className="p-3">Items</th>
                        <th className="p-3">Total</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map(order => (
                        <tr key={order.id} className="border-t">
                            <td className="p-3 text-sm">{order.id.slice(0, 8)}...</td>
                            <td className="p-3">{order.customer.name}</td>
                            <td className="p-3">{order.items.length}</td>
                            <td className="p-3 font-medium">${order.totalPrice}</td>

                            <td className="p-3">
                                <StatusBadge status={order.status} />
                            </td>

                            <td className="p-3">
                                <Link
                                    href={`/seller/orders/${order.id}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function StatusBadge({ status }: { status: string }) {
    const colors: Record<string, string> = {
        PENDING: "bg-yellow-100 text-yellow-700",
        CONFIRMED: "bg-blue-100 text-blue-700",
        SHIPPED: "bg-purple-100 text-purple-700",
        DELIVERED: "bg-green-100 text-green-700",
        CANCELLED: "bg-red-100 text-red-700",
    }

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colors[status]}`}>
            {status}
        </span>
    )
}
