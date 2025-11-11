/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { EyeIcon, Mail, User } from 'lucide-react';
import { showToast } from "nextjs-toast-notify";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ButtonLoader from '@/components/shared/ButtonLoader';
import { userRegister } from '@/utils/register';
import { IUser } from '@/types/user.type';

const logninFormSchema = z.object({
    name: z.string().min(1, "name is required"),
    email: z.email({
        message: "email is required",
    }),
    password: z
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
        }),
    confirmPassword: z.string()


}).refine((data) => data.password == data.confirmPassword, {
    message: "password does not match",
    path: ["confirmPassword"]
})

const RegisterForm = () => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const form = useForm<z.infer<typeof logninFormSchema>>({
        resolver: zodResolver(logninFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    })
    async function onSubmit(values: z.infer<typeof logninFormSchema>) {
        try {
            setLoading(true)
            const data = await userRegister(values)
            console.log(data);
            if (data.success) {
                showToast.success(data.message)
                if (!(data.data as IUser).isVerified) {
                    router.push(`/verify?email=${(data.data as IUser).email}`)
                } else {
                    router.push("/")
                }
            }
        } catch (error: any) {
            showToast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-6">
                    <div>
                        <label className="text-slate-900 text-[15px] font-medium mb-2 block">Name</label>
                        <div className=" flex items-center">
                            <FormField

                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <div className='relative'>
                                            <FormControl>
                                                <Input placeholder="name"  {...field} />
                                            </FormControl>
                                            <User className='absolute top-1/2 translate-y-[-50%] text-muted-foreground right-5' size={18} />

                                        </div>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-slate-900 text-[15px] font-medium mb-2 block">Email</label>
                        <div className=" flex items-center">
                            <FormField

                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <div className='relative'>
                                            <FormControl>
                                                <Input placeholder="email"  {...field} />
                                            </FormControl>
                                            <Mail className='absolute top-1/2 translate-y-[-50%] text-muted-foreground right-5' size={18} />

                                        </div>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-slate-900 text-[15px] font-medium mb-2 block">Password</label>
                        <div className="flex items-center">
                            <FormField

                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <div className='relative'>
                                            <FormControl>
                                                <Input placeholder="password"  {...field} />
                                            </FormControl>
                                            <EyeIcon className='absolute top-1/2 translate-y-[-50%] text-muted-foreground right-5' size={18} />

                                        </div>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-slate-900 text-[15px] font-medium mb-2 block">Confirm Password</label>
                        <div className="flex items-center">
                            <FormField

                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <div className='relative'>
                                            <FormControl>
                                                <Input placeholder="confirm password"  {...field} />
                                            </FormControl>
                                            <EyeIcon className='absolute top-1/2 translate-y-[-50%] text-muted-foreground right-5' size={18} />

                                        </div>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                </div>

                <div className="mt-12">
                    {
                        loading ? <ButtonLoader /> : <Button type="submit" className="w-full py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-md text-white focus:outline-none cursor-pointer">
                            Sign Up
                        </Button>
                    }

                </div>

            </form>
        </Form>
    );
};

export default RegisterForm;