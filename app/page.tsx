// app/page.tsx
import Hero from "@/components/home/Hero"
import Categories from "@/components/home/Categories"
import FeaturedMedicines from "@/components/home/FeaturedMedicines"
import { getSession } from "@/lib/api/auth"

export default async function HomePage() {
  const session = await getSession();
  console.log({ session })
  return (
    <main className="space-y-16">
      <Hero />
      <Categories />
      <FeaturedMedicines />
    </main>
  )
}

console.log(process.env.NEXT_PUBLIC_API_URL)