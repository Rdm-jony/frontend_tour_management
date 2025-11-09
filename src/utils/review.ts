import { IReview } from "@/types/review.type";
import { IResponse } from "@/types/successResponse.type";

export async function addReview(payload:Partial<IReview>) {
  try {
    const res = await fetch("http://localhost:5000/api/v1/review/create", {
      method: "POST",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "review create failed");
    }

    const data:IResponse<IReview> = await res.json();
    return data;
  } catch (error) {
    console.error( error);
    throw error; 
  }
}
export async function updateReview(payload:Partial<IReview>) {
  try {
    const res = await fetch(`http://localhost:5000/api/v1/review/${payload._id}`, {
      method: "PATCH",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "review update failed");
    }

    const data:IResponse<IReview> = await res.json();
    return data;
  } catch (error) {
    console.error( error);
    throw error; 
  }
}