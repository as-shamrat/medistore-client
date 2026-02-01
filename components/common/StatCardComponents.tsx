export function StatCard({ title, value }: { title: string; value: number }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-semibold">{value}</p>
        </div>
    )
}


export function StatusBadge({
    status,
}: {
    status: 'PENDING' | 'DELIVERED' | 'CANCELLED'
}) {
    const colors = {
        PENDING: 'bg-yellow-100 text-yellow-800',
        DELIVERED: 'bg-green-100 text-green-800',
        CANCELLED: 'bg-red-100 text-red-800',
    }

    return (
        <span
            className={`px-2 py-1 rounded text-xs font-medium ${colors[status]}`}
        >
            {status}
        </span>
    )
}