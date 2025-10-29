import Categoty from "@/components/modules/Home/Category"
import Division from "@/components/modules/Home/Division"
import Hero from "@/components/modules/Home/Hero"

export default function Home() {
  return (
    <>
      <Hero />
      <div className="max-w-6xl mx-auto">
        <Categoty />
        <Division />

      </div>
    </>
  )
}