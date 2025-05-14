import { type FC } from "react";
import UiHeading from "@/components/ui/UiHeading/UiHeading";
import classNames from "@/helpers/classNames";
import { useTranslations } from "next-intl";
import { useActualContent } from "@/hooks/useActualContent";
import { type ResumeItems } from "@/types/resume";

import styles from "./Contacts.module.scss";

interface ContactsProps {
  className?: string;
  content: ResumeItems;
}

const Contacts: FC<ContactsProps> = ({ className, content }) => {
  const t = useTranslations();
  const { actualContent } = useActualContent(content);

  if (!actualContent) {
    return null;
  }

  return (
    <div className={classNames(styles.contacts, className)}>
      <UiHeading level={2} weight="medium">
        {t("contacts.title")}
      </UiHeading>
      <div
        className={classNames(styles.content, "tiptap")}
        dangerouslySetInnerHTML={{ __html: actualContent }}
      />
    </div>
  );
};

export default Contacts;
