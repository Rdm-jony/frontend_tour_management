
import { revalidateTourTypes } from "@/app/action";
import { ITourType } from "@/types/category.type";
import { IResponse } from "@/types/successResponse.type";

// utils/userLogin.ts
export async function updateTourType(values: FormData, id: string) {
    try {
        const res = await fetch(`http://localhost:5000/api/v1/tour/tour-types/${id}`, {
            method: "PATCH",
            credentials: "include",
            body: values,
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Login failed");
        }
        await revalidateTourTypes()

        const data: IResponse<ITourType> = await res.json();
        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}
