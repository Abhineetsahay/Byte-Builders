import { auth } from "./auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/Login",
    "/Signin",
    "/NGO/Signin",
    "/api/auth",
  ];

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => 
    nextUrl.pathname.startsWith(route)
  );

  // API routes that require authentication
  const protectedApiRoutes = [
    "/api/chat",
    "/api/food-donations",
    "/api/users",
    "/api/orgs",
  ];

  // Check if the current path is a protected API route
  const isProtectedApiRoute = protectedApiRoutes.some(route => 
    nextUrl.pathname.startsWith(route)
  );

  // Pages that require authentication
  const protectedPages = [
    "/dashboard",
    "/food-donation",
    "/NGO",
    "/Report-issue",
    "/admin",
  ];

  // Check if the current path is a protected page
  const isProtectedPage = protectedPages.some(route => 
    nextUrl.pathname.startsWith(route)
  );

  // Admin routes that require admin role
  const adminRoutes = [
    "/admin",
    "/api/admin",
  ];

  // Check if the current path is an admin route
  const isAdminRoute = adminRoutes.some(route => 
    nextUrl.pathname.startsWith(route)
  );

  // Redirect to login if accessing protected routes without authentication
  if (!isLoggedIn && (isProtectedPage || isProtectedApiRoute)) {
    return NextResponse.redirect(new URL("/Login", nextUrl));
  }

  // Check admin access for admin routes
  if (isLoggedIn && isAdminRoute) {
    const userRole = req.auth?.user?.role;
    if (userRole !== "admin") {
      // Redirect non-admin users to dashboard
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
  }

  // Allow access to public routes and authenticated users
  return NextResponse.next();
});

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
