import { IResponse } from "@/types/successResponse.type";

/* eslint-disable @typescript-eslint/no-explicit-any */
const checkAuthStatus = async () => {
    try {
        const res = await fetch(`http://localhost:5000/api/v1/user/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) {
            throw new Error("Failed to fetch authentication status.");
        }

        return {
            isAuthenticated: true,
            user: data.data,
        }

    } catch (err: any) {
        console.log(err)
        return {
            isAuthenticated: false,
            user: null,
        }
    }

}
export async function forgetPassword({ email }: { email: string }) {
    console.log(email);
    try {
        const res = await fetch(`http://localhost:5000/api/v1/auth/forget-password`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "failed");
        }


        const data: IResponse<null> = await res.json();

        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}
export async function resetPassword({ newPassword, id, token }: { newPassword: string, id: string, token: string }) {
    try {
        const res = await fetch(`http://localhost:5000/api/v1/auth/reset-password`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "authorization": token
            },
            body: JSON.stringify({ newPassword, id }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "failed");
        }


        const data: IResponse<null> = await res.json();

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



export default checkAuthStatus;