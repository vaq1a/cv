"use client";

import { type FC } from "react";
import { EditorContent } from "@tiptap/react";
import classNames from "@/helpers/classNames";
import Toolbar from "@/components/modules/ContentEditor/Toolbar/Toolbar";
import { LoadingPlaceholder } from "@/components/modules/Common/LoadingPlaceholder/LoadingPlaceholder";
import { useSkillsForm } from "@/hooks/useSkillsForm";

import styles from "./SkillsForm.module.scss";

interface SkillsFormProps {
  className?: string;
}

const SkillsForm: FC<SkillsFormProps> = ({ className }) => {
  const {
    isMounted,
    isLoading,
    isPending,
    editor,
    currentLang,
    handleSetSkills,
    toggleLanguage,
  } = useSkillsForm();

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
        saveHandler={handleSetSkills}
        isSavePending={isPending}
        toggleLanguage={toggleLanguage}
      />
    </div>
  );
};

export default SkillsForm;
