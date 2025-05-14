import { type FC } from "react";
import classNames from "@/helpers/classNames";
import UiHeading from "@/components/ui/UiHeading/UiHeading";
import { useTranslations } from "next-intl";
import { useActualContent } from "@/hooks/useActualContent";
import { type ResumeItems } from "@/types/resume";

import styles from "./AboutMe.module.scss";

interface AboutMeProps {
  className?: string;
  content: ResumeItems;
}

const AboutMe: FC<AboutMeProps> = ({ className, content }) => {
  const t = useTranslations();
  const { actualContent } = useActualContent(content);

  if (!actualContent) {
    return null;
  }

  return (
    <div className={classNames(styles.aboutMe, className)}>
      <UiHeading level={2} weight="medium">
        {t("aboutMe.title")}
      </UiHeading>
      <div
        className="tiptap"
        dangerouslySetInnerHTML={{ __html: actualContent }}
      />
    </div>
  );
};

export default AboutMe;
