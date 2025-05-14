"use client";

import { type FC } from "react";
import { useTranslations } from "next-intl";
import UiHeading from "@/components/ui/UiHeading/UiHeading";
import classNames from "@/helpers/classNames";

interface AuthTitleProps {
  className?: string;
}

const AuthTitle: FC<AuthTitleProps> = ({ className }) => {
  const t = useTranslations();

  return (
    <UiHeading level={1} className={classNames("mb-10", className)}>
      {t("auth.title")}
    </UiHeading>
  );
};

export default AuthTitle;
