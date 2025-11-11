import AddDivision from "@/components/modules/dashboard/AddDivision";
import DivisionRow from "@/components/modules/dashboard/DivisionRow";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IDivision } from "@/types/division.type";

const AllDivisionPage = async () => {
    const res = await fetch('https://beckend-tour-management.vercel.app/api/v1/division', { cache: "no-store", next: { tags: ["divisions"] } });
    const data = await res.json();
    const divisions: IDivision[] = data?.data || [];

    return (
        <div className="p-4">
            <div className="flex justify-end my-5">
                <AddDivision />
            </div>
            <Table>
                <TableCaption>A list of all divisions.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px]">Image</TableHead>
                        <TableHead className="w-[150px]">Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Total Tour</TableHead>
                        <TableHead className="text-right w-[100px]">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {divisions.map((division) => (
                        <DivisionRow division={division} key={division._id} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AllDivisionPage;
