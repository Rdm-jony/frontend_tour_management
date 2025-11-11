import { IReview } from "@/types/review.type";
import { IResponse } from "@/types/successResponse.type";
import { getCookie } from "./tokenHandlers";

export async function addReview(payload: Partial<IReview>) {
  const token = await getCookie("accessToken");
  try {
    const res = await fetch("https://beckend-tour-management.vercel.app/api/v1/review/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "review create failed");
    }

    const data: IResponse<IReview> = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function updateReview(payload: Partial<IReview>) {
  const token = await getCookie("accessToken");
  try {
    const res = await fetch(`https://beckend-tour-management.vercel.app/api/v1/review/${payload._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "review update failed");
    }

    const data: IResponse<IReview> = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}