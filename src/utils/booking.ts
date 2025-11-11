/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBooking } from "@/types/booking.type";
import { IResponse } from "@/types/successResponse.type";
import { getCookie } from "./tokenHandlers";

// utils/userLogin.ts
export async function tourBooking(booking: Partial<IBooking>) {
  const token = await getCookie("accessToken");
  try {
    const res = await fetch("https://beckend-tour-management.vercel.app/api/v1/booking/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${token}`,
      },
      body: JSON.stringify(booking),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "booking failed");
    }

    const data: IResponse<any> = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function tourBookingReInit(bookingId: string) {
  const token = await getCookie("accessToken");
  try {
    const res = await fetch(`https://beckend-tour-management.vercel.app/api/v1/payment/init-payment/${bookingId}`, {
      method: "POST",
      headers: {
        "authorization": `${token}`,
      }
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "booking failed");
    }

    const data: IResponse<any> = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
