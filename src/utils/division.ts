

import { revalidateDivisions } from "@/app/action";
import { IDivision } from "@/types/division.type";
import { IResponse } from "@/types/successResponse.type";

export async function updateDivision(values: FormData, id: string) {
    try {
        const res = await fetch(`http://localhost:5000/api/v1/division/${id}`, {
            method: "PATCH",
            credentials: "include",
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
    try {
        const res = await fetch(`http://localhost:5000/api/v1/division/create`, {
            method: "POST",
            credentials: "include",
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
