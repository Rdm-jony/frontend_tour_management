import { revalidateTour } from "@/app/action";
import { IResponse } from "@/types/successResponse.type";
import { ITour } from "@/types/tour.type";

export async function updateTour(values: FormData, id: string) {
    try {
        const res = await fetch(`http://localhost:5000/api/v1/tour/${id}`, {
            method: "PATCH",
            credentials: "include",
            body: values,
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "failed");
        }
        await revalidateTour()

        const data: IResponse<ITour> = await res.json();
        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}