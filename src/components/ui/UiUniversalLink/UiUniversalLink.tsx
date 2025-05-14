import type { FC, ReactNode } from "react";
import Link from "next/link";
import { checkLinkType } from "@/helpers/checkLinkType";
import classNames from "@/helpers/classNames";

import styles from "./UiUniversalLink.module.scss";

const WEIGHTS = {
  light: styles["link--weight-light"],
  normal: styles["link--weight-normal"],
  medium: styles["link--weight-medium"],
  bold: styles["link--weight-bold"],
  extraBold: styles["link--weight-extra-bold"],
};

interface UniversalLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  weight?: keyof typeof WEIGHTS;
}

const UiUniversalLink: FC<UniversalLinkProps> = ({
  href,
  children,
  className,
  target,
  rel,
  weight = "normal",
  ...props
}) => {
  const { formattedHref, isExternal, isTel, isMailto } = checkLinkType(href);

  if (isExternal || isMailto || isTel) {
    return (
      <a
        href={formattedHref}
        className={classNames(
          className,
          styles.link,
          weight && WEIGHTS[weight],
        )}
        target={isExternal ? (target ?? "_blank") : undefined}
        rel={isExternal ? (rel ?? "noopener noreferrer") : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={formattedHref}
      className={classNames(className, styles.link)}
      {...props}
    >
      {children}
    </Link>
  );
};

export default UiUniversalLink;
