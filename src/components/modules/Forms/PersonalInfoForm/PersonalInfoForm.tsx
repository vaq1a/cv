"use client";

import { type FC } from "react";
import { EditorContent } from "@tiptap/react";
import classNames from "@/helpers/classNames";
import Toolbar from "@/components/modules/ContentEditor/Toolbar/Toolbar";
import { LoadingPlaceholder } from "@/components/modules/Common/LoadingPlaceholder/LoadingPlaceholder";
import { usePersonalInfoForm } from "@/hooks/usePersonalInfoForm";

import styles from "./PersonalInfoForm.module.scss";

interface PersonalInfoFormProps {
  className?: string;
}

const PersonalInfoForm: FC<PersonalInfoFormProps> = ({ className }) => {
  const {
    isMounted,
    isLoading,
    editor,
    currentLang,
    handleSetPersonalInfo,
    toggleLanguage,
  } = usePersonalInfoForm();

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
        saveHandler={handleSetPersonalInfo}
        toggleLanguage={toggleLanguage}
      />
    </div>
  );
};

export default PersonalInfoForm;
