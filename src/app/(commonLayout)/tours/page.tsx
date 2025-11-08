import ToursClient from "@/components/modules/Tours/ToursClient";
import { getAllTour } from "@/utils/tour";


export default async function ToursPage() {
  const data = await getAllTour();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-semibold mb-6">All Tours</h1>
      <ToursClient initialData={data} />
    </div>
  );
}
