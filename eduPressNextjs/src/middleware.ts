import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getProtectedData } from "@/services/api/apiRequests";
import type { User } from "@/services/types";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  try {
    const user: User = await getProtectedData();

    if (!user.emailVerified) {
      return NextResponse.redirect(new URL("/verify-email", request.url));
    }

    const isAdmin = user.role === "ADMIN";
    const isInstructor = user.role === "INSTRUCTOR";

    if (pathname.startsWith("/admin")) {
      const isCoursesRoute = pathname.startsWith("/admin/courses");
      
      if (isCoursesRoute && !isAdmin && !isInstructor) {
        return redirectToNotFound(request);
      }
      if (!isCoursesRoute && !isAdmin) {
        return redirectToNotFound(request);
      }
    }

    if (pathname.startsWith("/instructor") && !isAdmin && !isInstructor) {
      return redirectToNotFound(request);
    }

    return NextResponse.next();
  } catch (error) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

function redirectToNotFound(request: NextRequest) {
  return NextResponse.redirect(new URL("/not-found", request.url));
}

export const config = {
  matcher: ["/admin/:path*", "/instructor/:path*"],
};