import Categoty from "@/components/modules/Home/Category"
import Division from "@/components/modules/Home/Division"
import Hero from "@/components/modules/Home/Hero"
import TopDestination from "@/components/modules/Home/TopDestination"
import TopReview from "@/components/modules/Home/TopReview"

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="max-w-6xl mx-auto">
        <Categoty />
        <Division />
        <TopDestination />
        <TopReview />
      </div>
    </>
  )
}