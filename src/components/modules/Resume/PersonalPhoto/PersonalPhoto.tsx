import { type FC } from "react";

import Image from "next/image";
import classNames from "@/helpers/classNames";

import styles from "./PersonalPhoto.module.scss";

interface PersonalPhotoProps {
  personalPhoto: string;
  className?: string;
}

const PersonalPhoto: FC<PersonalPhotoProps> = ({
  personalPhoto,
  className,
}) => (
  <div className={styles.wrapper}>
    <Image
      src={personalPhoto}
      alt="Profile picture"
      width={264}
      height={264}
      unoptimized
      className={classNames(className, styles.image)}
      priority
    />
  </div>
);

export default PersonalPhoto;
