import { IResponse } from "@/types/successResponse.type";
import { IUser } from "@/types/user.type";

// utils/userLogin.ts
export async function userRegister({
    name,
    email,
    password,
}: {
    email: string;
    password: string;
    name: string
}) {
    try {
        const res = await fetch("https://beckend-tour-management.vercel.app/api/v1/user/register", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Login failed");
        }

        const data: IResponse<IUser> = await res.json();
        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}
