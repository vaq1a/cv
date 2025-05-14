import { type FC } from "react";
import classNames from "@/helpers/classNames";
import { type ResumeItems } from "@/types/resume";
import { useActualContent } from "@/hooks/useActualContent";

import styles from "./PersonalInfo.module.scss";

interface PersonalInfoProps {
  className?: string;
  content: ResumeItems;
}

const PersonalInfo: FC<PersonalInfoProps> = ({ className, content }) => {
  const { actualContent } = useActualContent(content);

  if (!actualContent) {
    return null;
  }

  return (
    <div
      className={classNames(className, styles.content, "tiptap")}
      dangerouslySetInnerHTML={{ __html: actualContent }}
    />
  );
};

export default PersonalInfo;
