/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBooking } from "@/types/booking.type";
import { IResponse } from "@/types/successResponse.type";

// utils/userLogin.ts
export async function tourBooking(booking:Partial<IBooking>) {
  try {
    const res = await fetch("http://localhost:5000/api/v1/booking/create", {
      method: "POST",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "booking failed");
    }

    const data:IResponse<any> = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}
