import type { FC } from "react";

import styles from "./LoadingPlaceholder.module.scss";

export const LoadingPlaceholder: FC = () => {
  return <div className={styles.placeholder} />;
};
