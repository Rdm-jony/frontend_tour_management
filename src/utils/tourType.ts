
import { revalidateTourTypes } from "@/app/action";
import { ITourType } from "@/types/category.type";
import { IResponse } from "@/types/successResponse.type";

// utils/userLogin.ts
export async function updateTourType(values: FormData, id: string) {
    try {
        const res = await fetch(`https://beckend-tour-management.vercel.app/api/v1/tour/tour-types/${id}`, {
            method: "PATCH",
            credentials: "include",
            body: values,
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "edit tour type failed");
        }
        await revalidateTourTypes()

        const data: IResponse<ITourType> = await res.json();
        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}
export async function addTourType(values: FormData) {
    try {
        const res = await fetch(`https://beckend-tour-management.vercel.app/api/v1/tour/create-tour-type`, {
            method: "POST",
            credentials: "include",
            body: values,
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "add tour type failed");
        }
        await revalidateTourTypes()

        const data: IResponse<ITourType> = await res.json();
        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}
