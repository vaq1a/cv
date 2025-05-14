import { type FC } from "react";
import classNames from "@/helpers/classNames";
import UiHeading from "@/components/ui/UiHeading/UiHeading";
import { useTranslations } from "next-intl";
import { useActualContent } from "@/hooks/useActualContent";
import { type ResumeItems } from "@/types/resume";

import styles from "./Experience.module.scss";

interface ExperienceProps {
  className?: string;
  content: ResumeItems;
}

const Experience: FC<ExperienceProps> = ({ className, content }) => {
  const t = useTranslations();
  const { actualContent } = useActualContent(content);

  if (!actualContent) {
    return null;
  }

  return (
    <div className={classNames(styles.experience, className)}>
      <UiHeading level={2} weight="medium">
        {t("experience.title")}
      </UiHeading>
      <div
        className={classNames(styles.content, "tiptap")}
        dangerouslySetInnerHTML={{ __html: actualContent }}
      />
    </div>
  );
};

export default Experience;
