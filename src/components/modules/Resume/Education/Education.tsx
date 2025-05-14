import { type FC } from "react";
import classNames from "@/helpers/classNames";
import UiHeading from "@/components/ui/UiHeading/UiHeading";
import { useTranslations } from "next-intl";
import { useActualContent } from "@/hooks/useActualContent";
import { type ResumeItems } from "@/types/resume";

import styles from "./Education.module.scss";

interface EducationProps {
  className?: string;
  content: ResumeItems;
}

const Education: FC<EducationProps> = ({ className, content }) => {
  const t = useTranslations();
  const { actualContent } = useActualContent(content);

  if (!actualContent) {
    return null;
  }

  return (
    <div className={classNames(className, styles.education)}>
      <UiHeading level={2} weight="medium">
        {t("education.title")}
      </UiHeading>
      <div
        className={classNames(styles.content, "tiptap")}
        dangerouslySetInnerHTML={{ __html: actualContent }}
      />
    </div>
  );
};

export default Education;
