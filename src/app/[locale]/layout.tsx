import "@/styles/globals.scss";
import "../../i18n/request";

import { type Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { TRPCReactProvider } from "@/trpc/react";
import { Inter } from "next/font/google";
import { LanguagesToggle } from "@/components/modules/Toggle/LanguagesToggle/LanguagesToggle";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { type AbstractIntlMessages } from "@/types/intl";

const inter = Inter({ subsets: ["latin"] });

import styles from "./Layout.module.scss";

interface MetadataProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.home.meta" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    openGraph: {
      title: t("og.title"),
      description: t("og.description"),
      locale: locale,
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
        { url: "/favicon.ico" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{ children: React.ReactNode; params: { locale: string } }>) {
  const currentLocaleData = (await import(`../../messages/${locale}.json`)) as {
    default: AbstractIntlMessages;
  };
  const messages = currentLocaleData.default;

  return (
    <html lang={locale} className={inter.className}>
      <body className={styles.body}>
        <TRPCReactProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
            <Toaster />
            <LanguagesToggle className={styles.toggle} />
          </NextIntlClientProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
