// app/actions/revalidateDivision.ts
"use server";

import { revalidateTag } from "next/cache";

export async function revalidateDivisions() {
    revalidateTag("divisions", "");
}
export async function revalidateTourTypes() {
    revalidateTag("tourTypes", "");
}
export async function revalidateTour() {
    revalidateTag("tour", "");
}

export async function revalidateUser() {
    revalidateTag("user", "");
}
