"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, MapPin } from "lucide-react";
import { IUser } from "@/types/user.type";
import { cn } from "@/lib/utils";
import DrawerComponent from "@/components/shared/Drawer";
import EditProfile from "./EditProfile";
import { useState } from "react";

export default function ProfileHeader({ user }: { user: IUser }) {
  const [openDrawer, setOpenDrawer] = useState(false)
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.picture} alt="Profile" />
              <AvatarFallback className="text-2xl uppercase">{user.email[0]}</AvatarFallback>
            </Avatar>

          </div>
          <div className="flex-1 space-y-2">
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              <h1 className="text-2xl font-bold">{user?.name}</h1>
              <Badge variant="secondary" className={cn(user.role == "ADMIN" ? "bg-primary" : "bg-green-400", "text-white")}>{user.role}</Badge>
            </div>
            <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail className="size-4" />
                {user?.email}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                {user.address}
              </div>

            </div>
          </div>
          <Button variant="default" onClick={() => setOpenDrawer(true)} className="cursor-pointer">Edit Profile</Button>
        </div>
      </CardContent>
      <DrawerComponent open={openDrawer} setOpen={setOpenDrawer}>
        <EditProfile user={user} setOpenDrawer={setOpenDrawer} />
      </DrawerComponent>
    </Card>
  );
}
