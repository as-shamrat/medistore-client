// app/page.tsx
import Hero from "@/components/home/Hero"
import Categories from "@/components/home/Categories"
import FeaturedMedicines from "@/components/home/FeaturedMedicines"



export default async function HomePage() {

  return (
    <main className="space-y-16">

      <Hero />
      <Categories />
      <FeaturedMedicines />


    </main>
  )
}

console.log(process.env.NEXT_PUBLIC_API_URL)