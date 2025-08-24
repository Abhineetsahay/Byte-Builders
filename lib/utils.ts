import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Authentication utilities
export async function requireAuth() {
  const session = await auth()
  if (!session) {
    redirect("/Login")
  }
  return session
}

export async function requireAdmin() {
  const session = await auth()
  if (!session) {
    redirect("/Login")
  }
  if (session.user.role !== "admin") {
    redirect("/dashboard")
  }
  return session
}

export async function getCurrentUser() {
  const session = await auth()
  return session?.user
}

export function isAuthenticated(session: any) {
  return !!session?.user
}

export function isAdmin(session: any) {
  return session?.user?.role === "admin"
}
