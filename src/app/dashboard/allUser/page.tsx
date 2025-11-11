"use client"
import UserRow from "@/components/modules/dashboard/UserRow";
import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IUser } from "@/types/user.type";
import { getCookie } from "@/utils/tokenHandlers";
import useSWR from "swr";

const fetcher = async (url: string) => {
    const token = await getCookie("accessToken");
    return fetch(url, { headers: { "authorization": `${token}`, } }).then((res) => res.json());
}
const AllUserPage = () => {
    const url = `https://beckend-tour-management.vercel.app/api/v1/user/all-users`;
    const { data, error, isLoading } = useSWR(url, fetcher)
    const users = data?.data as IUser[]
    return (
        <div>
            <Table>
                <TableCaption>A list of all user.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px]">Image</TableHead>
                        <TableHead className="w-[150px]">Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right w-[100px]">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users?.map((user) => (
                        <UserRow user={user} key={user._id} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default AllUserPage;