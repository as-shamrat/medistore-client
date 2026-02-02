"use client";

import { useEffect, useState } from "react";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"; // Shadcn UI Select
import { getAdminOrders } from "@/lib/fetcher";

interface Order {
    id: string;
    createdAt: string;
    status: string;
    shippingMethod: string;
    totalPrice: number;
    customer: { name: string; email: string };
    sellers: string[];
    itemsCount: number;
    totalQuantity: number;
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const { data } = await getAdminOrders();
            setOrders(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        // try {
        //     await axios.patch(`/api/admin/orders/${orderId}`, { status: newStatus });
        //     setOrders((prev) =>
        //         prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        //     );
        // } catch (error) {
        //     console.error("Failed to update status", error);
        // }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading orders...</p>;
    console.log({ orders })
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">All Orders</h1>

            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">Order ID</th>
                            <th className="px-4 py-2 border">Date</th>
                            <th className="px-4 py-2 border">Customer</th>
                            <th className="px-4 py-2 border">Sellers</th>
                            <th className="px-4 py-2 border">Items</th>
                            <th className="px-4 py-2 border">Total Qty</th>
                            <th className="px-4 py-2 border">Total Price</th>
                            <th className="px-4 py-2 border">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border font-mono text-sm">{order.id.slice(0, 8)}</td>
                                <td className="px-4 py-2 border">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="px-4 py-2 border">
                                    <p className="font-medium">{order.customer.name}</p>
                                    <p className="text-sm text-gray-500">{order.customer.email}</p>
                                </td>
                                <td className="px-4 py-2 border">{order.sellers.join(", ")}</td>
                                <td className="px-4 py-2 border">{order.itemsCount}</td>
                                <td className="px-4 py-2 border">{order.totalQuantity}</td>
                                <td className="px-4 py-2 border">${order.totalPrice.toFixed(2)}</td>
                                <td className="px-4 py-2 border">
                                    <Select
                                        value={order.status}
                                        onValueChange={(val) => handleStatusChange(order.id, val)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder={order.status} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PENDING">PENDING</SelectItem>
                                            <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
                                            <SelectItem value="SHIPPED">SHIPPED</SelectItem>
                                            <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                                            <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
