"use server";

import { revalidatePath } from "next/cache";

export default async function revalidateUserPath(path: string) {
  revalidatePath(path);
}
