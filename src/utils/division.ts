

import { revalidateDivisions } from "@/app/action";
import { IDivision } from "@/types/division.type";
import { IResponse } from "@/types/successResponse.type";
import { getCookie } from "./tokenHandlers";

export async function updateDivision(values: FormData, id: string) {
    const token = await getCookie("accessToken");
    try {
        const res = await fetch(`https://beckend-tour-management.vercel.app/api/v1/division/${id}`, {
            method: "PATCH",
            headers: {
                "authorization": `${token}`,
            },
            body: values,
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "failed");
        }
        await revalidateDivisions()

        const data: IResponse<IDivision> = await res.json();
        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}
export async function addDivision(values: FormData) {
    const token = await getCookie("accessToken");
    try {
        const res = await fetch(`https://beckend-tour-management.vercel.app/api/v1/division/create`, {
            method: "POST",
            headers: {
                "authorization": `${token}`,
            },
            body: values,
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "failed");
        }
        await revalidateDivisions()

        const data: IResponse<IDivision> = await res.json();
        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}
