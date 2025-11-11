
import { revalidateTourTypes } from "@/app/action";
import { ITourType } from "@/types/category.type";
import { IResponse } from "@/types/successResponse.type";
import { getCookie } from "./tokenHandlers";

// utils/userLogin.ts
export async function updateTourType(values: FormData, id: string) {
    const token = await getCookie("accessToken");
    try {
        const res = await fetch(`https://beckend-tour-management.vercel.app/api/v1/tour/tour-types/${id}`, {
            method: "PATCH",
            headers: {
                "authorization": `${token}`,
            },
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
    const token = await getCookie("accessToken");
    try {
        const res = await fetch(`https://beckend-tour-management.vercel.app/api/v1/tour/create-tour-type`, {
            method: "POST",
            headers: {
                "authorization": `${token}`,
            },
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
