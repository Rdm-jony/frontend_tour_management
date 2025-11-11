import ToursClient from "@/components/modules/Tours/ToursClient";
import { Suspense } from "react";


export default async function ToursPage() {

  return <Suspense fallback={<>loading......</>}>
    <ToursClient />
  </Suspense>
}
