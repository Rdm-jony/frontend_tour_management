import { revalidateTour } from "@/app/action";
import { IResponse } from "@/types/successResponse.type";
import { ITour } from "@/types/tour.type";
import { getCookie } from "./tokenHandlers";

export async function updateTour(values: FormData, id: string) {
    const token = await getCookie("accessToken");
    try {
        const res = await fetch(`https://beckend-tour-management.vercel.app/api/v1/tour/${id}`, {
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
        await revalidateTour()

        const data: IResponse<ITour> = await res.json();
        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}
export async function addTour(values: FormData) {
    const token = await getCookie("accessToken");
    try {
        const res = await fetch(`https://beckend-tour-management.vercel.app/api/v1/tour/create`, {
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
        await revalidateTour()

        const data: IResponse<ITour> = await res.json();
        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}
export async function getAllTour() {
    try {
        const res = await fetch(`https://beckend-tour-management.vercel.app/api/v1/tour`, {
            method: "GET",
            next: { tags: ["tour"] }
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "failed");
        }

        const data: IResponse<ITour[]> = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getTour(id: string) {
    try {
        const res = await fetch(`https://beckend-tour-management.vercel.app/api/v1/tour/${id}`, {
            method: "GET",
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "failed");
        }

        const data: IResponse<ITour[]> = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}