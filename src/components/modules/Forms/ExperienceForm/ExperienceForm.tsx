"use client";

import { type FC } from "react";
import { EditorContent } from "@tiptap/react";
import classNames from "@/helpers/classNames";
import Toolbar from "@/components/modules/ContentEditor/Toolbar/Toolbar";
import { LoadingPlaceholder } from "@/components/modules/Common/LoadingPlaceholder/LoadingPlaceholder";
import { useExperienceForm } from "@/hooks/useExperienceForm";

import styles from "./ExperienceForm.module.scss";

interface ExperienceFormProps {
  className?: string;
}

const ExperienceForm: FC<ExperienceFormProps> = ({ className }) => {
  const {
    isMounted,
    isLoading,
    isPending,
    editor,
    currentLang,
    handleSetExperience,
    toggleLanguage,
  } = useExperienceForm();

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
        saveHandler={handleSetExperience}
        isSavePending={isPending}
        toggleLanguage={toggleLanguage}
      />
    </div>
  );
};

export default ExperienceForm;
