// app/actions/revalidateDivision.ts
"use server";

import { revalidateTag } from "next/cache";

export async function revalidateDivisions() {
    revalidateTag("divisions", "");
}
export async function revalidateTourTypes() {
    revalidateTag("tourTypes", "");
}
