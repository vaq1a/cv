"use client";

import { type FC } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Toggle } from "@/components/ui/toggle";
import classNames from "@/helpers/classNames";
import { useLocale } from "next-intl";

import styles from "./LanguagesToggle.module.scss";

interface LanguagesToggleProps {
  className?: string;
}

export const LanguagesToggle: FC<LanguagesToggleProps> = ({ className }) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const handleLanguageChange = (locale: string) => {
    const newPath = pathname.replace(/^\/[a-z]{2}/, "");

    router.push(`/${locale}${newPath}`);
  };

  return (
    <div className={classNames(styles.toggle, className)}>
      <Toggle
        pressed={currentLocale === "en"}
        onPressedChange={() => handleLanguageChange("en")}
        variant="outline"
        aria-label="EN"
      >
        EN
      </Toggle>
      <Toggle
        pressed={currentLocale === "ru"}
        onPressedChange={() => handleLanguageChange("ru")}
        variant="outline"
        aria-label="RU"
      >
        RU
      </Toggle>
    </div>
  );
};
