
import { getSellerMedicines } from "@/lib/fetcher"
import MedicinesTables from "./MedicinesTables"

export default async function SellerMedicinesPage() {

    const data = await getSellerMedicines();



    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-semibold mb-1">My Medicines</h1>
            <p className="text-sm text-muted-foreground mb-6">
                Update price and stock for your medicines
            </p>

            <MedicinesTables medicines={data.data} />
        </div>
    )
}
