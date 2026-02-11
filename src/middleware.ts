import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { verifyToken } from "@/lib/jwt";
import {
  LOCALES,
  DEFAULT_LOCALE,
  ADMIN_PATH,
  AUTH_PATH,
} from "@/constant/routes";

const localeMiddleware = createMiddleware({
  locales: LOCALES,
  defaultLocale: DEFAULT_LOCALE,
});

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token");
  const tokenValue = token?.value;

  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale) {
    request.nextUrl.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
  }

  const pathWithoutLocale = pathnameHasLocale
    ? pathname.substring(3)
    : pathname;

  const isAuth = !!(await verifyToken(
    tokenValue,
    process.env.JWT_SECRET ?? "",
  ));

  if (pathWithoutLocale.startsWith(ADMIN_PATH) && !isAuth) {
    const locale = pathnameHasLocale ? pathname.split("/")[1] : DEFAULT_LOCALE;

    return NextResponse.redirect(
      new URL(`/${locale}${AUTH_PATH}`, request.url),
    );
  }

  if (pathWithoutLocale.startsWith(AUTH_PATH) && isAuth) {
    const locale = pathnameHasLocale ? pathname.split("/")[1] : DEFAULT_LOCALE;

    return NextResponse.redirect(
      new URL(`/${locale}${ADMIN_PATH}`, request.url),
    );
  }

  return localeMiddleware(request);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/auth/:path*",
    "/((?!api|_next/static|_next/image|_next/font|sprite.svg|robots.txt|sitemap.xml|favicon.ico|manifest.json|manifest.webmanifest).*)",
  ],
};
