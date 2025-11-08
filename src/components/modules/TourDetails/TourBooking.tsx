/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { showToast } from "nextjs-toast-notify";
import checkAuthStatus from "@/utils/auth";
import { tourBooking } from "@/utils/booking";
import { ITour } from "@/types/tour.type";
import { IUser } from "@/types/user.type";
import ButtonLoader from "@/components/shared/ButtonLoader";

const TourBooking = ({ tour }: { tour: ITour }) => {
    const [count, setCount] = useState(1);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<{ isAuthenticated: boolean; user: IUser } | null>(null);
    const router = useRouter();

    // ✅ Fetch authentication status once component mounts
    useEffect(() => {
        const fetchAuth = async () => {
            const data = await checkAuthStatus();
            setUser(data);
        };
        fetchAuth();
    }, []);

    // ✅ Handle tour booking
    const handleBooking = async () => {
        try {
            if (!tour._id) {
                showToast.error("Tour ID not found");
                return;
            }

            if (!user?.isAuthenticated) {
                showToast.error("Please login to book a tour");
                router.push("/signIn");
                return;
            }

            setLoading(true);
            const response = await tourBooking({ tour: tour._id, guestCount: count, user: user?.user._id });
            console.log(response);
            if (response.success) {
                showToast.success(response.message || "Tour booked successfully!");
                window.location.href = response.data.paymentURL;
            } else {
                showToast.error(response.message || "Booking failed");
            }
        } catch (error: any) {
            showToast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border p-10 space-y-4 rounded-lg shadow-lg sticky top-1/2 bg-white">
            {/* Guest Counter */}
            <div className="flex">
                <Button
                    variant="outline"
                    onClick={() => setCount((prev) => Math.max(1, prev - 1))}
                    disabled={count <= 1}
                    className="rounded-r-none"
                >
                    <Minus />
                </Button>
                <Button variant="outline" className="rounded-none cursor-default">
                    {count}
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setCount((prev) => Math.min(5, prev + 1))}
                    disabled={count >= 5}
                    className="rounded-l-none"
                >
                    <Plus />
                </Button>
            </div>

            <p className="font-semibold text-muted-foreground text-sm">Max Guest: 5</p>

            {/* Dynamic Total Price */}
            <p className="font-semibold text-xl">
                Total: {tour.costForm as number * count} BDT
            </p>
            {
                loading ? <ButtonLoader /> : <Button
                    className="w-full cursor-pointer"
                    onClick={handleBooking}
                    disabled={loading}
                >
                    Book Now
                </Button>
            }

        </div>
    );
};

export default TourBooking;
