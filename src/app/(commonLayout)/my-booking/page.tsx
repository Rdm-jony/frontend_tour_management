"use client";

import useSWR from "swr";
import { IBooking, BOOKING_STATUS } from "@/types/booking.type";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const fetcher = (url: string) =>
  fetch(url, { credentials: "include" }).then((res) => res.json());

const MyBookingPage = () => {
  const url = `http://localhost:5000/api/v1/booking/myBooking`;
  const { data, error, isLoading } = useSWR(url, fetcher);
  const bookings = data?.data as IBooking[];

  if (isLoading) return <div className="text-center mt-10">Loading bookings...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Failed to load bookings.</div>;
  if (!bookings || bookings.length === 0) return <div className="text-center mt-10">No bookings found.</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">My Bookings</h1>

      {bookings.map((booking) => {
        const tour = typeof booking.tour === "string" ? null : booking.tour;
        const payment = booking.payment || {};

        return (
          <div
            key={booking._id}
            className="flex flex-col md:flex-row gap-4 border rounded-xl shadow-md p-4 bg-white"
          >
            {/* Tour Image */}
            <div className="w-full md:w-1/3 h-48 relative rounded-lg overflow-hidden">
              {tour?.images?.[0] ? (
                <Image
                  src={tour.images[0]}
                  alt={tour.title || "Tour Image"}
                  className="object-cover w-full h-full"
                  fill
                />
              ) : (
                <div className="bg-gray-200 w-full h-full flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
            </div>

            {/* Booking Details */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{tour?.title || "Unknown Tour"}</h2>
                <p className="text-gray-600 mt-1 line-clamp-3">
                  {tour?.description || "No description available."}
                </p>

                <div className="mt-2 flex flex-wrap gap-2 items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Guests: {booking.guestCount}
                  </span>

                  {/* Booking Status */}
                  <span
                    className={cn(
                      "px-2 py-1 rounded-full text-sm font-semibold",
                      booking.status === BOOKING_STATUS.COMPLETE
                        ? "bg-green-100 text-green-800"
                        : booking.status === BOOKING_STATUS.CANCEL
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    )}
                  >
                    {booking.status}
                  </span>
                </div>

                <p className="text-gray-700 mt-2 font-medium">
                  Amount: {payment.amount || 0} BDT
                </p>
              </div>

              {/* Actions */}
              <div className="mt-4 md:mt-0 flex gap-2 justify-end">
                {payment.status === "PAID" && payment.invoiceUrl && (
                  <a href={payment.invoiceUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-green-500">View Invoice</Button>
                  </a>
                )}
                {booking.status === BOOKING_STATUS.PENDING && payment.status !== "PAID" && (
                  <Button className="text-white">
                    Pay Now
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyBookingPage;
