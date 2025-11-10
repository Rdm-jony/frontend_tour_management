/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { IResponse } from "@/types/successResponse.type";
import { IUser } from "@/types/user.type";
import { parse } from "cookie";
import { cookies } from "next/headers";


// utils/userLogin.ts
export async function userLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;

    const res = await fetch("http://localhost:5000/api/v1/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const setCookieHeaders = res.headers.getSetCookie();

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        const parsedCookie = parse(cookie);

        if (parsedCookie['accessToken']) {
          accessTokenObject = parsedCookie;
        }
        if (parsedCookie['refreshToken']) {
          refreshTokenObject = parsedCookie;
        }
      })
    } else {
      throw new Error("No Set-Cookie header found");
    }
    if (!accessTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    if (!refreshTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject['SameSite'] || "none",
    });

    cookieStore.set("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(refreshTokenObject['Max-Age']) || 1000 * 60 * 60 * 24 * 90,
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject['SameSite'] || "none",
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
