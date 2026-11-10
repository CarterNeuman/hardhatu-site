import { clerkMiddleware } from "@clerk/nextjs/server";

// Next.js 16 renamed middleware.ts -> proxy.ts (same request-interception
// mechanism, just a new file name/export). clerkMiddleware() just attaches
// auth state to every request; it does NOT lock any page behind a login by
// itself. Nothing on the site requires signing in to view -- this exists so
// server code (API routes, server components) can read "is someone signed
// in" via auth() from "@clerk/nextjs/server". Page-level login walls, if any
// are ever added, go through auth.protect() in that specific route, not here.
export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next's internals and static files, unless they're referenced in
    // search params (Clerk's own recommended default matcher).
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes.
    "/(api|trpc)(.*)",
  ],
};
