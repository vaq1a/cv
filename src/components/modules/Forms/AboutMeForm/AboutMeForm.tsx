"use client";

import { type FC } from "react";
import { EditorContent } from "@tiptap/react";
import classNames from "@/helpers/classNames";
import Toolbar from "@/components/modules/ContentEditor/Toolbar/Toolbar";
import { LoadingPlaceholder } from "@/components/modules/Common/LoadingPlaceholder/LoadingPlaceholder";
import { useAboutMeForm } from "@/hooks/useAboutMeForm";

import styles from "./AboutMeForm.module.scss";

interface AboutMeFormProps {
  className?: string;
}

const AboutMeForm: FC<AboutMeFormProps> = ({ className }) => {
  const {
    isMounted,
    isLoading,
    isPending,
    editor,
    currentLang,
    handleSetAboutMe,
    toggleLanguage,
  } = useAboutMeForm();

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
        saveHandler={handleSetAboutMe}
        isSavePending={isPending}
        toggleLanguage={toggleLanguage}
      />
    </div>
  );
};

export default AboutMeForm;
