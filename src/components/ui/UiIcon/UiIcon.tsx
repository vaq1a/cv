import { type FC } from "react";
import classNames from "@/helpers/classNames";
import { type IconsName } from "@/types/icons";

import styles from "./UiIcon.module.scss";

interface IconProps {
  name: IconsName;
  className?: string;
}

const UiIcon: FC<IconProps> = ({ name, className }) => {
  return (
    <svg className={classNames(styles.icon, className)}>
      <use xlinkHref={`/sprite.svg#icon-${name}`} />
    </svg>
  );
};

export default UiIcon;
