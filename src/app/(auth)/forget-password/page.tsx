/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import ButtonLoader from "@/components/shared/ButtonLoader";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgetPassword } from "@/utils/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { showToast } from "nextjs-toast-notify";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z, { date, email } from "zod";

const formSchema = z.object({
    email: z.email()
})

const ForgetPassPage = () => {
    const [isLoading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            setLoading(true)
            const result = await forgetPassword({ email: data?.email })
            if (result.success) {
                showToast.success(result.message)
            }
        } catch (error: any) {
            showToast.error(error.message)
        } finally {
            setLoading(false)

        }
    }


    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="md:w-1/4 w-full">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Forget your passowrd?</CardTitle>
                    <CardDescription>
                        We will send you an an link at <br /> {""}
                    </CardDescription>

                    <Form {...form}>
                        <form id="forgetPassForm" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="email" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </form>
                    </Form>
                </CardHeader>
                <CardFooter className="flex ">
                    {
                        isLoading ? <ButtonLoader /> : <Button type="submit" form="forgetPassForm" className="w-full">
                            Confirm
                        </Button>
                    }
                </CardFooter>
            </Card>
        </div>
    );
};

export default ForgetPassPage;