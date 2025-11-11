/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { changePassword } from "@/utils/auth";
import { showToast } from "nextjs-toast-notify";
import { useState } from "react";
import ButtonLoader from "@/components/shared/ButtonLoader";

const strongPassword = z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
        message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
        message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
        message: "Password must contain at least 1 number.",
    })
    .nonempty({ message: "Password is required." });

const changePasswordSchema = z
    .object({
        oldPassword: z.string().nonempty("Old password is required."),
        newPassword: strongPassword,
        confirmPassword: z.string().nonempty("Please confirm your new password."),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match.",
    });

type FormValues = z.infer<typeof changePasswordSchema>;

const ChangePassword = ({ setOpenDrawer }: { setOpenDrawer: (bool: boolean) => void }) => {
    const [loading, setLoading] = useState(false)

    const form = useForm<FormValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values: FormValues) => {
        setLoading(true)

        try {
            const result = await changePassword({ oldPassword: values.oldPassword, newPassword: values.newPassword })
            if (result.success) {
                showToast.success(result.message)
                setOpenDrawer(false)
            }

        } catch (error: any) {
            showToast.error(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <Card className="max-w-md mx-auto mt-10 shadow-lg rounded-2xl">
            <CardHeader>
                <CardTitle className="text-center text-xl font-semibold">
                    Change Password
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="oldPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Old Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter your current password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter new strong password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm New Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Re-enter new password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {
                            loading ? <ButtonLoader /> : <Button type="submit" className="w-full cursor-pointer">
                                Update Password
                            </Button>
                        }
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default ChangePassword;
