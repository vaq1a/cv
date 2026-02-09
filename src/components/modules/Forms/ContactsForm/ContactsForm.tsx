"use client";

import { type FC } from "react";
import { EditorContent } from "@tiptap/react";
import classNames from "@/helpers/classNames";
import Toolbar from "@/components/modules/ContentEditor/Toolbar/Toolbar";
import { LoadingPlaceholder } from "@/components/modules/Common/LoadingPlaceholder/LoadingPlaceholder";
import { useContactsForms } from "@/hooks/useContactsForms";

import styles from "./ContactsForm.module.scss";

interface ContactsFormProps {
  className?: string;
}

const ContactsForm: FC<ContactsFormProps> = ({ className }) => {
  const {
    isMounted,
    isLoading,
    isPending,
    editor,
    currentLang,
    handleSetContacts,
    toggleLanguage,
  } = useContactsForms();

  if (!isMounted || isLoading) {
    return <LoadingPlaceholder />;
  }

  return (
    <div className={classNames(styles.editor, className)}>
      <EditorContent className={styles.editor__field} editor={editor} />
      <Toolbar
        className={styles.editor__toolbar}
        editor={editor}
        currentLang={currentLang}
        saveHandler={handleSetContacts}
        isSavePending={isPending}
        toggleLanguage={toggleLanguage}
      />
    </div>
  );
};

export default ContactsForm;
