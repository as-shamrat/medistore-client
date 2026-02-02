"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { addMedicine, getCategories } from "@/lib/fetcher"
import { useRouter } from "next/navigation"


export default function AddMedicinePage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState<{ id: string, name: string, description?: string }[]>([])

    useEffect(() => {
        async function fetchCategories() {
            const response = await getCategories();
            if (!response.success) throw new Error('Categories could not be found')
            setCategories(response.data)
        }
        fetchCategories()
    }, [])
    console.log({ categories })
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)

        const payload = {
            name: formData.get("name"),
            description: formData.get("description"),
            price: Number(formData.get("price")),
            stock: Number(formData.get("stock")),
            manufacturer: formData.get("manufacturer"),
            categoryId: formData.get("categoryId"),
        }

        console.log("Submitting medicine:", payload)

        // TODO: call backend API
        // await addMedicine(payload)

        const response = await addMedicine(payload as {
            name: string,
            description: string,
            price: number,
            stock: number,
            manufacturer: string,
            categoryId: string
        })

        setLoading(false)
        if (response.success) {
            router.push("/seller/medicines")
        } else {
            window.alert(response.message)
        }
    }

    return (
        <div className="max-w-3xl mx-auto py-10">
            <h1 className="text-2xl font-semibold mb-6">
                Add New Medicine
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-6 bg-white p-6 rounded-xl border"
            >
                {/* Name */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Medicine Name
                    </label>
                    <Input name="name" required placeholder="Paracetamol 500mg" />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Description
                    </label>
                    <Textarea
                        name="description"
                        placeholder="Used for pain relief and fever"
                    />
                </div>

                {/* Price & Stock */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Price
                        </label>
                        <Input
                            type="number"
                            name="price"
                            required
                            min={0}
                            placeholder="100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Stock
                        </label>
                        <Input
                            type="number"
                            name="stock"
                            required
                            min={0}
                            placeholder="50"
                        />
                    </div>
                </div>

                {/* Manufacturer */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Manufacturer
                    </label>
                    <Input
                        name="manufacturer"
                        required
                        placeholder="Square Pharmaceuticals"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Category
                    </label>
                    <Select name="categoryId">
                        <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            {/* Replace with real categories later */}
                            {
                                categories.length > 0 && categories.map(cat => {
                                    return <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                                })
                            }
                            {/* <SelectItem value="cat1">Allergy</SelectItem>
                            <SelectItem value="cat2">Heart Care</SelectItem>
                            <SelectItem value="cat3">Skin Care</SelectItem>
                            <SelectItem value="cat4">Orthopedics</SelectItem> */}
                        </SelectContent>
                    </Select>
                </div>

                {/* Submit */}
                <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Medicine"}
                </Button>
            </form>
        </div>
    )
}
