import Link from "next/link"

export default function OrderSuccessPage() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="text-center max-w-md">
                <h1 className="text-3xl font-bold text-green-600">
                    🎉 Order Placed Successfully!
                </h1>

                <p className="mt-4 text-gray-600">
                    Thank you for your order. Your medicines will be delivered soon.
                </p>

                <div className="mt-6 flex justify-center gap-4">
                    <Link
                        href="/orders"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        View Orders
                    </Link>

                    <Link
                        href="/shop"
                        className="px-6 py-2 border rounded-lg"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    )
}
