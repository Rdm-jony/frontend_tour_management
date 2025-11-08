"use client";

import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { IUser, Role, IsActive } from "@/types/user.type";
import { Edit } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import DrawerComponent from "@/components/shared/Drawer";
import EditUser from "./EditUser";

interface UserRowProps {
  user: IUser;
}

const roleColors: Record<Role, string> = {
  SUPERADMIN: "bg-red-500 text-white",
  ADMIN: "bg-yellow-500 text-black",
  USER: "bg-blue-500 text-white",
  GUIDE: "bg-green-500 text-white",
};

const statusColors: Record<IsActive, string> = {
  ACTIVE: "bg-green-100 text-green-800",
  INACTIVE: "bg-gray-100 text-gray-800",
  BLOCKED: "bg-red-100 text-red-800",
};

export default function UserRow({ user }: UserRowProps) {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <TableRow>
        {/* Avatar */}
        <TableCell className="relative w-12 h-12 overflow-hidden rounded-md">
          {user?.picture ? (
            <Image src={user.picture} alt={user.name} fill className="object-cover" />
          ) : (
            <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500">
              {user.name[0]}
            </div>
          )}
        </TableCell>

        {/* Name */}
        <TableCell className="font-medium">{user.name}</TableCell>

        {/* Email */}
        <TableCell className="max-w-[300px] text-sm text-muted-foreground truncate" title={user.email}>
          {user.email}
        </TableCell>

        {/* Role */}
        <TableCell>
          <span
            className={cn(
              "px-2 py-1 rounded-full text-sm font-medium",
              roleColors[user.role]
            )}
          >
            {user.role}
          </span>
        </TableCell>

        {/* Status */}
        <TableCell>
          <span
            className={cn(
              "px-2 py-1 rounded-full text-sm font-medium",
              statusColors[user.isActive || "INACTIVE"]
            )}
          >
            {user.isActive || "INACTIVE"}
          </span>
        </TableCell>

        {/* Actions */}
        <TableCell className="text-right">
          <Button onClick={() => setOpenDrawer(true)} size="icon" variant="outline">
            <Edit className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>
      <DrawerComponent open={openDrawer} setOpen={setOpenDrawer}>
        <EditUser/>
      </DrawerComponent>

     
    </>
  );
}
