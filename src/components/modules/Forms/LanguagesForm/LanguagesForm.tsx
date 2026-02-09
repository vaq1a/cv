"use client";

import { type FC } from "react";
import { EditorContent } from "@tiptap/react";
import classNames from "@/helpers/classNames";
import Toolbar from "@/components/modules/ContentEditor/Toolbar/Toolbar";
import { LoadingPlaceholder } from "@/components/modules/Common/LoadingPlaceholder/LoadingPlaceholder";
import { useLanguagesForm } from "@/hooks/useLanguagesForm";

import styles from "./LanguagesForm.module.scss";

interface LanguagesFormProps {
  className?: string;
}

const LanguagesForm: FC<LanguagesFormProps> = ({ className }) => {
  const {
    isMounted,
    isLoading,
    isPending,
    editor,
    currentLang,
    handleSetLanguages,
    toggleLanguage,
  } = useLanguagesForm();

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
        saveHandler={handleSetLanguages}
        isSavePending={isPending}
        toggleLanguage={toggleLanguage}
      />
    </div>
  );
};

export default LanguagesForm;
