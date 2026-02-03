"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // for App Router
import { useCart } from "@/app/hooks/useCart";
// import addToCart function if you have cart functionality

interface Medicine {
    id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    category: { name: string };
    seller: { name: string, id: string };
}

export default function MedicineDetailsPage() {
    const params = useParams();
    const medicineId = params.id;
    const [medicine, setMedicine] = useState<Medicine | null>(null);
    const cartContext = useCart();
    // console.log(cartContext)

    useEffect(() => {
        async function fetchMedicine() {
            try {
                const res = await fetch(`https://medi-store-phi.vercel.app/api/medicines/${medicineId}`);
                const data = await res.json();
                setMedicine(data.data);
            } catch (err) {
                console.error("Failed to fetch medicine", err);
            }
        }

        if (medicineId) fetchMedicine();
    }, [medicineId]);

    function handleAddToCart() {
        cartContext.addItem({
            medicineId: medicine?.id as string,
            name: medicine?.name as string,
            price: medicine?.price as number,
            quantity: 1,
            sellerId: medicine?.seller?.id as string,
        })
    }
    if (!medicine) {
        <div className="container mx-auto p-4">Medicine loading...</div>
    }
    // console.log({ medicine })
    // console.log(cartContext.items)
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">{medicine?.name}</h1>
            <p className="text-gray-600">{medicine?.category.name}</p>
            <p className="mt-2 font-bold text-xl">${medicine?.price}</p>
            <p className="mt-2">{medicine?.description}</p>
            <p className="mt-2">Stock: {medicine?.stock}</p>
            <p className="mt-1 text-sm text-gray-500">Seller: {medicine?.seller.name}</p>

            <button onClick={handleAddToCart} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add to Cart
            </button>
        </div>
    );
}
