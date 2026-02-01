import Link from "next/link"

const categories = [
    { name: "Pain Relief", slug: "pain-relief" },
    { name: "Antibiotics", slug: "antibiotics" },
    { name: "Diabetes Care", slug: "diabetes" },
    { name: "Heart & Blood", slug: "heart-blood" },
    { name: "Skin Care", slug: "skin-care" },
    { name: "Vitamins", slug: "vitamins" },
]

export default function Categories() {
    return (
        <section className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((cat) => (
                    <Link
                        key={cat.slug}
                        href={`/shop?category=${cat.slug}`}
                        className="border rounded-lg p-4 text-center hover:shadow-md transition"
                    >
                        <p className="font-medium">{cat.name}</p>
                    </Link>
                ))}
            </div>
        </section>
    )
}
