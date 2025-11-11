/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import ButtonLoader from "@/components/shared/ButtonLoader";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";
import { sendOtp, verifyOtp } from "@/utils/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dot } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { showToast } from "nextjs-toast-notify";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
});

export default function VerifyPageClient() {
    const params = useSearchParams();
    const router = useRouter();
    const [email] = useState(params.get("email"));
    const [confirmed, setConfirmed] = useState(false);
    const [timer, setTimer] = useState(120);
    const [senOtpLoading, setSendOtpLoading] = useState(false)
    const [verifyOtpLoading, setVerifyOtpLoading] = useState(false)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    });

    const handleSendOtp = async () => {
        if (!email) {
            return showToast.error("email not found")
        }
        setSendOtpLoading(true)
        try {
            const result = await sendOtp({ email: email });

            if (result.success) {
                showToast.success("OTP Sent");
                setConfirmed(true);
                setTimer(120);
            }
        } catch (err: any) {
            showToast.error(err?.message)
        } finally {
            setSendOtpLoading(false)
        }
    };

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        if (!email) {
            return showToast.error("email not found")
        }
        const userInfo = {
            email,
            otp: data.pin,
        };
        setVerifyOtpLoading(true)
        try {
            const res = await verifyOtp(userInfo);
            if (res.success) {
                showToast.success("OTP Verified");
                setConfirmed(true);
                router.push("/signIn")
            }
        } catch (error: any) {
            console.log(error);
            showToast.error(error?.message)
        } finally {
            setVerifyOtpLoading(false)
        }
    };



    useEffect(() => {
        if (!email || !confirmed) {
            return;
        }

        const timerId = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timerId);
    }, [email, confirmed]);

    return (
        <div className="grid place-content-center h-screen">
            {confirmed ? (
                <Card className="lg:w-[400px] w-full text-center">
                    <CardHeader>
                        <CardTitle className="text-xl">Verify your email address</CardTitle>
                        <CardDescription>
                            Please enter the 6-digit code we sent to <br /> {email}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form
                                id="otp-form"
                                onSubmit={form.handleSubmit(onSubmit)}
                                className=" space-y-6"
                            >
                                <FormField
                                    control={form.control}
                                    name="pin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>One-Time Password</FormLabel>
                                            <FormControl>
                                                <InputOTP maxLength={6} {...field}>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={0} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={1} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={2} />
                                                    </InputOTPGroup>
                                                    <Dot />
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={3} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={4} />
                                                    </InputOTPGroup>
                                                    <InputOTPGroup>
                                                        <InputOTPSlot index={5} />
                                                    </InputOTPGroup>
                                                </InputOTP>
                                            </FormControl>
                                            <FormDescription>
                                                <Button
                                                    onClick={handleSendOtp}
                                                    type="button"
                                                    variant="link"
                                                    disabled={timer !== 0}
                                                    className={cn("p-0 m-0", {
                                                        "cursor-pointer": timer === 0,
                                                        "text-gray-500": timer !== 0,
                                                    })}
                                                >
                                                    Resent OPT:{" "}
                                                </Button>{" "}
                                                {timer}
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </form>
                        </Form>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        {
                            verifyOtpLoading ? <ButtonLoader /> : <Button className="w-full cursor-pointer" form="otp-form" type="submit">
                                Submit
                            </Button>
                        }
                    </CardFooter>
                </Card>
            ) : (
                <Card className="lg:w-[400px] w-full text-center">
                    <CardHeader>
                        <CardTitle className="text-xl">Verify your email address</CardTitle>
                        <CardDescription>
                            We will send you an OTP at <br /> {email}
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-end">
                        {
                            senOtpLoading ? <ButtonLoader /> : <Button onClick={handleSendOtp} className="w-full cursor-pointer">
                                Confirm
                            </Button>
                        }
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}