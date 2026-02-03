"use client";

import Link from "next/link";
import { useEffect, useState } from "react";



interface Medicine {
    id: string;
    name: string;
    price: number;
    category: { name: string };
    description?: string;
}

export default function ShopPage() {
    const [medicines, setMedicines] = useState<Medicine[]>([]);

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);




    useEffect(() => {
        async function fetchMedicines() {
            setLoading(true);
            try {
                const query = new URLSearchParams();
                if (search) query.append("search", search);

                const res = await fetch(`https://medi-store-phi.vercel.app/api/medicines?${query.toString()}`);
                const data = await res.json();
                setMedicines(data.data || []);
            } catch (err) {
                console.error("Failed to fetch medicines", err);
            } finally {
                setLoading(false);
            }
        }
        fetchMedicines();
    }, [search]);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Shop Medicines</h1>

            {/* Filters */}
            <div className="flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border px-2 py-1 rounded flex-1"
                />


            </div>

            {/* Medicines Grid */}
            {loading ? (
                <p>Loading...</p>
            ) : medicines.length === 0 ? (
                <p>No medicines found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {medicines.map((med) => (
                        <div key={med.id} className="border p-4 rounded shadow hover:shadow-lg transition">
                            <h2 className="font-semibold text-lg">{med.name}</h2>
                            <p className="text-sm text-gray-600">{med.category.name}</p>
                            <p className="mt-2 font-bold">${med.price}</p>
                            {med.description && <p className="text-sm mt-1">{med.description}</p>}
                            <Link href={`/shop/${med?.id}`}>Detail...</Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
