import { IResponse } from "@/types/successResponse.type";
import { IUser } from "@/types/user.type";

// utils/userLogin.ts
export async function userLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const res = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      credentials:"include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data:IResponse<IUser> = await res.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error; 
  }
}
