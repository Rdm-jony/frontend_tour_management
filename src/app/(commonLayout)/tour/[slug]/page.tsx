import TourDetailsClient from "@/components/modules/TourDetails/TourDetailsClient";
import { getTour } from "@/utils/tour";


export default async function TourDetailsPage({ params }: { params: { slug: string } }) {
    const resolvedParams = await params;
    const initialData = await getTour(resolvedParams?.slug);
    return <TourDetailsClient initialData={initialData} slug={resolvedParams?.slug}/>;
}
