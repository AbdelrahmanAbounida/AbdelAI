"use server";
import { signOut } from "@/auth";

export const logout = async () => {
  const resp = await signOut();
};
