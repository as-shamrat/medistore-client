"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { updateSellerMedicine } from "@/lib/fetcher"

type Medicine = {
    id: string
    name: string
    price: number
    stock: number
}

export default function MedicinesTables({ medicines }: { medicines: Medicine[] }) {
    const [loadingId, setLoadingId] = useState<string | null>(null)
    const [rows, setRows] = useState(medicines)

    async function handleUpdate(id: string, price: number, stock: number) {
        try {
            setLoadingId(id)

            await updateSellerMedicine(id, { price, stock })

        } catch (err) {
            console.error(err)
        } finally {
            setLoadingId(null)
        }
    }

    return (
        <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-muted">
                    <tr>
                        <th className="text-left p-3">Medicine</th>
                        <th className="text-left p-3">Price</th>
                        <th className="text-left p-3">Stock</th>
                        <th className="text-right p-3">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {rows.map((med, index) => (
                        <tr key={med.id} className="border-t">
                            <td className="p-3 font-medium">{med.name}</td>

                            <td className="p-3">
                                <Input
                                    type="number"
                                    value={med.price}
                                    onChange={(e) => {
                                        const updated = [...rows]
                                        updated[index].price = Number(e.target.value)
                                        setRows(updated)
                                    }}
                                    className="w-28"
                                />
                            </td>

                            <td className="p-3">
                                <Input
                                    type="number"
                                    value={med.stock}
                                    onChange={(e) => {
                                        const updated = [...rows]
                                        updated[index].stock = Number(e.target.value)
                                        setRows(updated)
                                    }}
                                    className="w-24"
                                />
                            </td>

                            <td className="p-3 text-right">
                                <Button
                                    size="sm"
                                    disabled={loadingId === med.id}
                                    onClick={() =>
                                        handleUpdate(med.id, med.price, med.stock)
                                    }
                                >
                                    {loadingId === med.id ? "Saving..." : "Update"}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
