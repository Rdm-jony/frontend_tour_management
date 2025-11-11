import AddTourType from "@/components/modules/dashboard/AddTourType";
import TourTypeRow from "@/components/modules/dashboard/TourTypeRow";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ITourType } from "@/types/category.type";

const AllTourTypePage = async () => {
    const res = await fetch('https://beckend-tour-management.vercel.app/api/v1/tour/tour-types', { cache: "no-store", next: { tags: ["tourTypes"] } });
    const data = await res.json();
    const tourTypes: ITourType[] = data?.data || [];

    return (
        <div className="p-4">
            <div className="flex justify-end my-5">
                <AddTourType />
            </div>
            <Table>
                <TableCaption>A list of all divisions.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px]">Image</TableHead>
                        <TableHead className="text-center">Name</TableHead>
                        <TableHead className="text-right w-[100px]">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tourTypes.map((tourType) => (
                        <TourTypeRow tourType={tourType} key={tourType._id} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AllTourTypePage;
