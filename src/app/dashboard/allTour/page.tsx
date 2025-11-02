import TourRow from "@/components/modules/dashboard/TourRow";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ITour } from "@/types/tour.type";

const AllTour = async () => {
    const res = await fetch('http://localhost:5000/api/v1/tour', { next: { tags: ["tour"] } })
    const data = await res.json()
    const tours = data.data as ITour[]
    return (
        <div>
            <Table>
                <TableCaption>A list of all tours.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Tour Type</TableHead>
                        <TableHead className="text-center">Location</TableHead>
                        <TableHead className="text-right w-[100px]">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tours?.map((tour) => (
                        <TourRow tour={tour} key={tour._id} />
                    ))}
                </TableBody>
            </Table>

        </div>
    );
};

export default AllTour;