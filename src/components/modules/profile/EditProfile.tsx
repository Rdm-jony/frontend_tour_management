/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { email, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IUser } from "@/types/user.type";
import { use, useState } from "react";
import { FileMetadata } from "@/hooks/use-file-upload";
import SingleFileUploader from "@/components/singleFileUploader";
import { showToast } from "nextjs-toast-notify";
import { updateProfile } from "@/utils/auth";
import ButtonLoader from "@/components/shared/ButtonLoader";

// ✅ Validation schema
const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.email().min(1, "Email is required"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    phone: z
        .string()
        .regex(/^01[3-9]\d{8}$/, "Enter a valid Bangladeshi phone number"),
});

type FormValues = z.infer<typeof formSchema>;

const EditProfile = ({ user, setOpenDrawer }: { user: IUser, setOpenDrawer: (bool: boolean) => void }) => {
    const [image, setImage] = useState<(File | FileMetadata) | null>(null);
    const [loading, setLoading] = useState(false)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            address: user?.address || "",
            phone: user?.phone || "",
        },
    });

    const onSubmit = async (values: FormValues) => {
        if (!user._id) {
            return showToast.error("user id not found")
        }
        const formdata = new FormData()
        if (image) {
            formdata.append("file", image as File)
        }

        formdata.append("data", JSON.stringify(values))

        setLoading(true)
        try {
            const result = await updateProfile(formdata, user._id)
            if (result.success) {
                showToast.success(result.message)
                setOpenDrawer(false)
            }
        } catch (error: any) {
            showToast.error(error.message)
        } finally {
            setLoading(false)
        }


    };

    return (
        <Card className="max-w-lg mx-auto mt-10 shadow-lg rounded-2xl">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-center">
                    Edit Profile
                </CardTitle>
            </CardHeader>
            <CardContent>
                <SingleFileUploader onChange={setImage} defaultImage={user.picture} />

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />



                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="01XXXXXXXXX" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {
                            loading ? <ButtonLoader /> : <Button type="submit" className="w-full cursor-pointer">
                                Save Changes
                            </Button>
                        }
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default EditProfile;
