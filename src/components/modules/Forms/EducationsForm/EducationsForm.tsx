"use client";

import { type FC } from "react";
import { EditorContent } from "@tiptap/react";
import classNames from "@/helpers/classNames";
import Toolbar from "@/components/modules/ContentEditor/Toolbar/Toolbar";
import { LoadingPlaceholder } from "@/components/modules/Common/LoadingPlaceholder/LoadingPlaceholder";
import { useEducationsForm } from "@/hooks/useEducationsForm";

import styles from "./EducationsForm.module.scss";

interface EducationsFormProps {
  className?: string;
}

const EducationsForm: FC<EducationsFormProps> = ({ className }) => {
  const {
    isMounted,
    isLoading,
    editor,
    currentLang,
    handleSetEducations,
    toggleLanguage,
  } = useEducationsForm();

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
        saveHandler={handleSetEducations}
        toggleLanguage={toggleLanguage}
      />
    </div>
  );
};

export default EducationsForm;
