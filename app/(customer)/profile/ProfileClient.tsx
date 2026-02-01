'use client'

import { updateProfile } from '@/lib/api/auth'
import { useState } from 'react'

type Profile = {
    name: string
    email: string
    phone?: string
    address?: string
}

export default function ProfileClient({ profile }: { profile: Profile }) {
    const [form, setForm] = useState(profile)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState('')

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setSuccess('')

        const res = await updateProfile(form)

        if (res.success) {
            setSuccess('Profile updated successfully')
        }

        setLoading(false)
    }

    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-5 bg-white p-6 rounded-lg shadow"
            >
                <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        name="email"
                        value={form.email}
                        disabled
                        className="w-full border rounded-md px-3 py-2 bg-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Phone</label>
                    <input
                        name="phone"
                        value={form.phone || ''}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <textarea
                        name="address"
                        value={form.address || ''}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2"
                        rows={3}
                    />
                </div>

                <button
                    disabled={loading}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>

                {success && (
                    <p className="text-green-600 text-sm mt-2">{success}</p>
                )}
            </form>
        </div>
    )
}
