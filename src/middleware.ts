import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { verifyToken } from "@/helpers/verifyToken";

const locales = ["en", "ru"];
const defaultLocale = "en";

const localeMiddleware = createMiddleware({
  locales,
  defaultLocale,
});

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token");
  const tokenValue = token?.value;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale) {
    request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  const pathWithoutLocale = pathnameHasLocale
    ? pathname.substring(3)
    : pathname;

  const isAuth = await verifyToken(tokenValue);

  if (pathWithoutLocale.startsWith("/admin") && !isAuth) {
    const locale = pathnameHasLocale ? pathname.split("/")[1] : defaultLocale;

    return NextResponse.redirect(new URL(`/${locale}/auth`, request.url));
  }

  if (pathWithoutLocale.startsWith("/auth") && isAuth) {
    const locale = pathnameHasLocale ? pathname.split("/")[1] : defaultLocale;

    return NextResponse.redirect(new URL(`/${locale}/admin`, request.url));
  }

  return localeMiddleware(request);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/auth/:path*",
    "/((?!api|_next/static|_next/image|_next/font|sprite.svg|favicon.ico|manifest.json|site.webmanifest).*)",
  ],
};
