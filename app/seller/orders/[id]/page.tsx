import { get } from "http"
import OrderStatusClient from "./OrderStatusClient"
import { getSellerOrderById } from "@/lib/fetcher"
type PageProps = {
    params: Promise<{ id: string }>
}

export default async function SellerOrderDetailsPage({
    params,
}: PageProps) {
    const { id } = await params
    console.log(id)
    const { data } = await getSellerOrderById(id)
    console.log({ data })
    const { order } = data;
    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-semibold mb-4">
                Order #{data.order.id.slice(0, 8)}
            </h1>

            <div className="bg-white border rounded-lg p-4 mb-6">
                <p><strong>Customer:</strong> {order.customer.name}</p>
                <p><strong>Email:</strong> {order.customer.email}</p>
                <p><strong>Address:</strong> {order.address}</p>
            </div>

            <div className="bg-white border rounded-lg p-4 mb-6">
                <h2 className="font-semibold mb-3">Items</h2>
                {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between py-2 border-b last:border-none">
                        <span>{item.medicine.name}</span>
                        <span>
                            {item.quantity} × ${item.price}
                        </span>
                    </div>
                ))}
            </div>

            <OrderStatusClient orderId={order.id} currentStatus={order.status} />
        </div>

    )
}
