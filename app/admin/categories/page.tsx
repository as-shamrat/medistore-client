"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addCategory, getCategories, updateCategory } from "@/lib/fetcher";

interface Category {
    id: string;
    name: string;
}

export default function AdminCategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategory, setNewCategory] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState("");

    const fetchCategories = async () => {
        const res = await getCategories()
        setCategories(res.data);
    };

    // Fetch categories
    useEffect(() => {
        fetchCategories();
    }, []);



    // Add new category
    const handleAddCategory = async () => {
        if (!newCategory.trim()) return;

        // await axios.post("/api/admin/categories", { name: newCategory });
        await addCategory({ name: newCategory })
        setNewCategory("");
        fetchCategories();
    };

    // Update category
    const handleUpdateCategory = async (id: string) => {
        if (!editingName.trim()) return;

        await updateCategory(id, { name: editingName })

        setEditingId(null);
        setEditingName("");
        fetchCategories();
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-6">Manage Categories</h1>

            {/* Add Category */}
            <div className="flex gap-3 mb-8">
                <Input
                    placeholder="New category name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <Button onClick={handleAddCategory}>Add</Button>
            </div>

            {/* Category List */}
            <div className="space-y-4">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="flex items-center justify-between border rounded-lg p-4"
                    >
                        {editingId === category.id ? (
                            <Input
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                            />
                        ) : (
                            <p className="font-medium">{category.name}</p>
                        )}

                        <div className="flex gap-2">
                            {editingId === category.id ? (
                                <Button
                                    size="sm"
                                    onClick={() => handleUpdateCategory(category.id)}
                                >
                                    Save
                                </Button>
                            ) : (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                        setEditingId(category.id);
                                        setEditingName(category.name);
                                    }}
                                >
                                    Edit
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
