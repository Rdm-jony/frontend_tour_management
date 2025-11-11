"use client"
import { Shield, Key } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { IUser } from "@/types/user.type";
import { useState } from "react";
import DrawerComponent from "@/components/shared/Drawer";
import ChangePassord from "./ChangePassord";

export default function ProfileContent({ user }: { user: IUser }) {
  const [openDrawer, setOpenDrawer] = useState(false)
  return (
    <Tabs defaultValue="personal" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      {/* Personal Information */}
      <TabsContent value="personal" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details and profile information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue={user.name} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user?.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue={user?.phone} />
              </div>


            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Authentication by</Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself..."
                defaultValue={user.auths.map(auth => auth.provider).join(",")}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" defaultValue={user.address} />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Security Settings */}
      <TabsContent value="security" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Manage your account security and authentication.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Password</Label>
                  <p className="text-muted-foreground text-sm">Last changed 3 months ago</p>
                </div>
                <Button variant="outline" onClick={() => setOpenDrawer(true)}>
                  <Key className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
              </div>

              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-base">Active Sessions</Label>
                  <p className="text-muted-foreground text-sm">
                    Manage devices that are logged into your account
                  </p>
                </div>
                <Button variant="outline">
                  <Shield className="mr-2 h-4 w-4" />
                  View Sessions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <DrawerComponent open={openDrawer} setOpen={setOpenDrawer}>
        <ChangePassord setOpenDrawer={setOpenDrawer} />
      </DrawerComponent>
    </Tabs>
  );
}
