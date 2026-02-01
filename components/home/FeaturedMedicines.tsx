import Link from "next/link"

const featured = [
    { id: 1, name: "Paracetamol 500mg", price: 30 },
    { id: 2, name: "Azithromycin 500mg", price: 120 },
    { id: 3, name: "Vitamin C 1000mg", price: 180 },
]

export default function FeaturedMedicines() {
    return (
        <section className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Featured Medicines</h2>
                <a href="/shop" className="text-blue-600 hover:underline">
                    View All
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featured.map((item) => (
                    <div
                        key={item.id}
                        className="border rounded-lg p-4 hover:shadow-md transition"
                    >
                        <h3 className="font-medium text-lg">{item.name}</h3>
                        <p className="mt-2 text-gray-600">৳ {item.price}</p>

                        <Link
                            href={`/shop/${item.id}`}
                            className="inline-block mt-4 text-sm text-blue-600 hover:underline"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    )
}
