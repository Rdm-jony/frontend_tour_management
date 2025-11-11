/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { IResponse } from "@/types/successResponse.type";
import { IUser } from "@/types/user.type";
import { parse } from "cookie";
import { getCookie, setCookie } from "./tokenHandlers";


// utils/userLogin.ts
export async function userLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const token = await getCookie("accessToken");
  try {
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;

    const res = await fetch("https://beckend-tour-management.vercel.app/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${token}`,
      },
      body: JSON.stringify({ email, password }),
    });


    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Login failed");
    }

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
    }

    await setCookie("accessToken", accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject['SameSite'] || "none",
    })


    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(refreshTokenObject['Max-Age']) || 1000 * 60 * 60 * 24 * 90,
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject['SameSite'] || "none",
    });




    const data: IResponse<IUser> = await res.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}
