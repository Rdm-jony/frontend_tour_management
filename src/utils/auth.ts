import { IResponse } from "@/types/successResponse.type";
import { IUser } from "@/types/user.type";
import { deleteCookie, getCookie } from "./tokenHandlers";
import { revalidateUser } from "@/app/action";
import { redirect } from "next/navigation";


export async function forgetPassword({ email }: { email: string }) {
    const token = await getCookie("accessToken");
    try {
        const res = await fetch(`https://beckend-tour-management.vercel.app/api/v1/auth/forget-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `${token}`,
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
export async function resetPassword({ newPassword, id }: { newPassword: string, id: string, }) {
    const token = await getCookie("accessToken");
    try {
        const res = await fetch(`https://beckend-tour-management.vercel.app/api/v1/auth/reset-password`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "authorization": `${token}`,
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

export async function sendOtp({ email }: { email: string }) {
    const token = await getCookie("accessToken");
    try {
        const res = await fetch(`https://beckend-tour-management.vercel.app/api/v1/otp/send`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `${token}`,
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
        console.error(error);
        throw error;
    }
}
export async function verifyOtp({ email, otp }: { email: string, otp: string }) {
    const token = await getCookie("accessToken");
    try {
        const res = await fetch(`https://beckend-tour-management.vercel.app/api/v1/otp/verify`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `${token}`,
            },
            body: JSON.stringify({ email, otp }),
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
export async function getMe() {
    const token = await getCookie("accessToken");
    if (!token) return null;

    try {
        const res = await fetch(`https://beckend-tour-management.vercel.app/api/v1/user/me`, {
            method: "GET",
            headers: {
                "authorization": `${token}`,
            },
            next: { tags: ["user"] }
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData?.message || "Failed to fetch user data");
        }

        const data: IResponse<IUser> = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        await deleteCookie("accessToken")
        await deleteCookie("refreshToken")
        redirect("/signin");
    }
}
export async function updateProfile(formData: FormData, userId: string) {
    const token = await getCookie("accessToken");

    try {
        const res = await fetch(`https://beckend-tour-management.vercel.app/api/v1/user/${userId}`, {
            method: "PATCH",
            headers: {
                "authorization": `${token}`,
            },
            body: formData,

        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData?.message || "Failed to update user data");
        }

        revalidateUser()

        const data: IResponse<IUser> = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function changePassword({ oldPassword, newPassword }: { oldPassword: string, newPassword: string }) {
    const token = await getCookie("accessToken");
    try {
        const res = await fetch(`https://beckend-tour-management.vercel.app/api/v1/auth/change-password`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "authorization": `${token}`,
            },
            body: JSON.stringify({ oldPassword, newPassword }),

        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData?.message || "Failed");
        }

        revalidateUser()

        const data: IResponse<IUser> = await res.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}




