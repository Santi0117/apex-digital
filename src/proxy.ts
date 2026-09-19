import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isSistemaHost(host: string) {
  const h = host.toLowerCase().split(":")[0] ?? "";
  return (
    h === "sistema.onvisiondigital.com" ||
    h.startsWith("sistema.") ||
    h.includes("sistema-") // Vercel preview aliases
  );
}

/**
 * sistema.onvisiondigital.com → SaaS / verticales (Activar).
 * onvisiondigital.com → landing Digital (sin cambios).
 *
 * Next.js 16: Middleware was renamed to Proxy (`proxy.ts`).
 */
export function proxy(request: NextRequest) {
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    request.nextUrl.hostname;
  if (!isSistemaHost(host)) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Home del subdominio = selector de verticales
  if (pathname === "/" || pathname === "") {
    const url = request.nextUrl.clone();
    url.pathname = "/activar";
    // Redirect (not rewrite) so a stale CDN HIT of `/` cannot keep serving Digital.
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Skip static assets and Next internals.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4|ico)$).*)",
  ],
};
