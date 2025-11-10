/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Image from 'next/image';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';
import { EyeIcon, Mail } from 'lucide-react';
import { userLogin } from '@/utils/login';
import { showToast } from "nextjs-toast-notify";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ButtonLoader from '@/components/shared/ButtonLoader';
import Link from 'next/link';

const logninFormSchema = z.object({
    email: z.email({
        message: "email is required",
    }),
    password: z.string("password is required")

})

const LoginForm = ({ redirect }: { redirect: string }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const form = useForm<z.infer<typeof logninFormSchema>>({
        resolver: zodResolver(logninFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })
    async function onSubmit(values: z.infer<typeof logninFormSchema>) {
        try {
            setLoading(true)
            const data = await userLogin(values)
            if (data.success) {
                showToast.success(data.message)
                router.push(redirect ? redirect : "/")
            }
        } catch (error: any) {
            showToast.error(error.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>


                    <div className="space-y-6">
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
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-slate-300 rounded-md" />
                                <label className="ml-3 block text-[15px] text-slate-900">
                                    Remember me
                                </label>
                            </div>
                            <div>
                                <Link href="/forget-password" className="text-blue-600 font-medium text-sm hover:underline">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12">
                        {
                            loading ? <ButtonLoader /> : <Button type="submit" className="w-full py-2.5 px-4 text-[15px] font-medium tracking-wide rounded-md text-white focus:outline-none cursor-pointer">
                                Sign in
                            </Button>
                        }

                    </div>

                    <div className="my-4 flex items-center gap-4">
                        <hr className="w-full border-slate-300" />
                        <p className="text-sm text-slate-900 text-center">or</p>
                        <hr className="w-full border-slate-300" />
                    </div>

                    <button type="button" className="w-full flex items-center justify-center gap-4 py-2.5 px-6 text-[15px] font-medium tracking-wide text-slate-900 border border-slate-300 rounded-md bg-slate-50 hover:bg-slate-100 focus:outline-none cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" className="inline" viewBox="0 0 512 512">
                            <path fill="#fbbd00"
                                d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                                data-original="#fbbd00" />
                            <path fill="#0f9d58"
                                d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                                data-original="#0f9d58" />
                            <path fill="#31aa52"
                                d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                                data-original="#31aa52" />
                            <path fill="#3c79e6"
                                d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                                data-original="#3c79e6" />
                            <path fill="#cf2d48"
                                d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                                data-original="#cf2d48" />
                            <path fill="#eb4132"
                                d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                                data-original="#eb4132" />
                        </svg>
                        Continue with google
                    </button>
                </form>
            </Form>
        </div>
    );
};

export default LoginForm;