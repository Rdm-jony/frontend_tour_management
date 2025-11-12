import Categoty from "@/components/modules/Home/Category"
import Division from "@/components/modules/Home/Division"
import Hero from "@/components/modules/Home/Hero"
import TopDestination from "@/components/modules/Home/TopDestination"
import TopReview from "@/components/modules/Home/TopReview"
import { ITourType } from "@/types/category.type"
import { IDivision } from "@/types/division.type"

export default async function HomePage() {
  const [divisionsRes, categoriesRes] = await Promise.all([
    fetch("https://beckend-tour-management.vercel.app/api/v1/division", { cache: "force-cache" }),
    fetch("https://beckend-tour-management.vercel.app/api/v1/tour/tour-types", { cache: "force-cache" }),
  ])

  const [divisionsData, categoriesData] = await Promise.all([
    divisionsRes.json(),
    categoriesRes.json(),
  ])

  const categories = categoriesData?.data as ITourType[]
  const divisions = divisionsData?.data as IDivision[]
  return (
    <>
      <Hero categories={categories} divisions={divisions} />()
      <div className="max-w-6xl mx-auto">
        <Categoty />
        <Division />
        <TopDestination />
        <TopReview />
      </div>
    </>
  )
}