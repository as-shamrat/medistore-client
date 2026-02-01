'use client'

type OrderItem = {
    medicine: {
        name: string
    }
    price: number
    quantity: number
}

type Order = {
    id: string
    totalPrice: number
    address: string
    status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
    customer: {
        name: string
        email: string
    }
    items: OrderItem[]
}

const statusStyles: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    PAID: 'bg-green-100 text-green-700',
    SHIPPED: 'bg-blue-100 text-blue-700',
    DELIVERED: 'bg-emerald-100 text-emerald-700',
    CANCELLED: 'bg-red-100 text-red-700',
}

export default function OrderDetails({ order }: { order: Order }) {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">

            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-2xl font-bold">
                        Order Details
                    </h1>
                    <p className="text-sm text-gray-500">
                        Order ID: {order.id}
                    </p>
                </div>

                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[order.status]}`}
                >
                    {order.status}
                </span>
            </div>

            {/* Customer Info */}
            <div className="border rounded-lg p-4">
                <h2 className="font-semibold mb-2">Customer</h2>
                <p>{order.customer.name}</p>
                <p className="text-sm text-gray-500">
                    {order.customer.email}
                </p>
            </div>

            {/* Items */}
            <div className="border rounded-lg p-4">
                <h2 className="font-semibold mb-4">Order Items</h2>

                <div className="space-y-3">
                    {order.items.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center border-b pb-3 last:border-b-0"
                        >
                            <div>
                                <p className="font-medium">
                                    {item.medicine.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    ৳ {item.price} × {item.quantity}
                                </p>
                            </div>

                            <p className="font-semibold">
                                ৳ {item.price * item.quantity}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Address */}
            <div className="border rounded-lg p-4">
                <h2 className="font-semibold mb-2">Delivery Address</h2>
                <p className="text-gray-700">{order.address}</p>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center border-t pt-4">
                <span className="text-lg font-semibold">
                    Total Amount
                </span>
                <span className="text-xl font-bold">
                    ৳ {order.totalPrice}
                </span>
            </div>
        </div>
    )
}
