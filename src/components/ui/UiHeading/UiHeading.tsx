import { type ReactNode, type FC } from "react";
import classNames from "@/helpers/classNames";

import styles from "./UiHeading.module.scss";

const LEVELS = {
  1: styles["heading--level-1"],
  2: styles["heading--level-2"],
  3: styles["heading--level-3"],
};

const WEIGHTS = {
  light: styles["heading--weight-light"],
  normal: styles["heading--weight-normal"],
  medium: styles["heading--weight-medium"],
  bold: styles["heading--weight-bold"],
  extraBold: styles["heading--weight-extra-bold"],
};

interface HeadingProps {
  level: keyof typeof LEVELS;
  weight?: keyof typeof WEIGHTS;
  children: ReactNode;
  className?: string;
}

const UiHeading: FC<HeadingProps> = ({
  level,
  children,
  className,
  weight = "normal",
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={classNames(
        styles.heading,
        level && LEVELS[level],
        weight && WEIGHTS[weight],
        className,
      )}
    >
      {children}
    </Tag>
  );
};

export default UiHeading;
