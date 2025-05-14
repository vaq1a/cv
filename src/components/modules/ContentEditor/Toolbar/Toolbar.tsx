"use client";

import { useCallback, useState } from "react";
import { type Editor } from "@tiptap/react";
import classNames from "@/helpers/classNames";
import IconPicker from "@/components/modules/ContentEditor/IconPicker/IconPicker";
import UiIcon from "@/components/ui/UiIcon/UiIcon";

import styles from "./Toolbar.module.scss";

type Props = {
  editor: Editor | null;
  className?: string;
  saveHandler: () => void;
  toggleLanguage: () => void;
  currentLang: string;
};

const Toolbar = ({
  editor,
  className,
  saveHandler,
  currentLang,
  toggleLanguage,
}: Props) => {
  const [active, setActive] = useState<boolean>(false);

  const setLink = useCallback(({ editor }: { editor: Editor }) => {
    const previousUrl = editor.getAttributes("link").href as string;
    const url = window.prompt("URL", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e) {
      alert((e as Error).message);
    }
  }, []);

  const toggleLink = () => {
    if (!editor) {
      return;
    }

    if (editor.isActive("link")) {
      editor.chain().focus().unsetLink().run();

      return;
    }

    setLink({ editor });
  };

  function toggleToolbar() {
    setActive(!active);
  }

  const activeToggleToolbarIcon = active ? "corners-in" : "corners-out";

  if (!editor) {
    return null;
  }

  return (
    <div
      className={classNames(
        className,
        styles.toolbar,
        active && styles["toolbar--active"],
      )}
    >
      {/*TODO: add title list*/}
      {/*<Button*/}
      {/*  variant="outline"*/}
      {/*  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}*/}
      {/*  className={classNames(*/}
      {/*    editor.isActive("heading", { level: 1 }) && styles["button--active"],*/}
      {/*    styles.button,*/}
      {/*  )}*/}
      {/*>*/}
      {/*  H1*/}
      {/*</Button>*/}
      {/*<Button*/}
      {/*  variant="outline"*/}
      {/*  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}*/}
      {/*  className={classNames(*/}
      {/*    editor.isActive("heading", { level: 2 }) && styles["button--active"],*/}
      {/*    styles.button,*/}
      {/*  )}*/}
      {/*>*/}
      {/*  H2*/}
      {/*</Button>*/}
      {/*<Button*/}
      {/*  variant="outline"*/}
      {/*  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}*/}
      {/*  className={classNames(*/}
      {/*    editor.isActive("heading", { level: 3 }) && styles["button--active"],*/}
      {/*    styles.button,*/}
      {/*  )}*/}
      {/*>*/}
      {/*  H3*/}
      {/*</Button>*/}
      {/*<Button*/}
      {/*  variant="outline"*/}
      {/*  onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}*/}
      {/*  className={classNames(*/}
      {/*    editor.isActive("heading", { level: 4 }) && styles["button--active"],*/}
      {/*    styles.button,*/}
      {/*  )}*/}
      {/*>*/}
      {/*  H4*/}
      {/*</Button>*/}
      {/*<Button*/}
      {/*  variant="outline"*/}
      {/*  onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}*/}
      {/*  className={classNames(*/}
      {/*    editor.isActive("heading", { level: 5 }) && styles["button--active"],*/}
      {/*    styles.button,*/}
      {/*  )}*/}
      {/*>*/}
      {/*  H5*/}
      {/*</Button>*/}
      {/*<Button*/}
      {/*  variant="outline"*/}
      {/*  onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}*/}
      {/*  className={classNames(*/}
      {/*    editor.isActive("heading", { level: 6 }) && styles["button--active"],*/}
      {/*    styles.button,*/}
      {/*  )}*/}
      {/*>*/}
      {/*  H6*/}
      {/*</Button>*/}
      {active && (
        <div className={styles.toolbar__column}>
          <div className={styles.toolbar__cell}>
            <button
              onClick={saveHandler}
              title="Save"
              className={styles.button}
            >
              <UiIcon name="save" />
            </button>
          </div>
          <div className={styles.toolbar__cell}>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().undo().run();
              }}
              className={styles.button}
            >
              <UiIcon name="undo" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().redo().run();
              }}
              className={styles.button}
            >
              <UiIcon name="redo" />
            </button>
          </div>
          <div className={styles.toolbar__cell}>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleBold().run();
              }}
              className={classNames(
                styles.button,
                editor.isActive("bold") && styles["button--active"],
              )}
            >
              <UiIcon name="text-bolder" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleItalic().run();
              }}
              className={classNames(
                styles.button,
                editor.isActive("italic") && styles["button--active"],
              )}
            >
              <UiIcon name="text-italic" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleUnderline().run();
              }}
              className={classNames(
                styles.button,
                editor.isActive("underline") && styles["button--active"],
              )}
            >
              <UiIcon name="text-underline" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleStrike().run();
              }}
              className={classNames(
                styles.button,
                editor.isActive("strike") && styles["button--active"],
              )}
            >
              <UiIcon name="text-strikethrough" />
            </button>
            <button
              onClick={() => editor.chain().focus().setHardBreak().run()}
              className={styles.button}
            >
              <UiIcon name="down-left-arrow" />
            </button>
          </div>
          <div className={styles.toolbar__cell}>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleBulletList().run();
              }}
              className={classNames(
                styles.button,
                editor.isActive("bulletList") && styles["button--active"],
              )}
            >
              <UiIcon name="list-bullets" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleOrderedList().run();
              }}
              className={classNames(
                styles.button,
                editor.isActive("orderedList") && styles["button--active"],
              )}
            >
              <UiIcon name="list-numbers" />
            </button>
          </div>
          <div className={styles.toolbar__cell}>
            <button
              onClick={(e) => {
                e.preventDefault();
                editor.chain().focus().toggleCodeBlock().run();
              }}
              className={classNames(
                styles.button,
                editor.isActive("codeBlock") && styles["button--active"],
              )}
            >
              <UiIcon name="code" />
            </button>
          </div>
          <div className={styles.toolbar__cell}>
            <button
              onClick={toggleLink}
              className={editor.isActive("link") ? "is-active" : ""}
            >
              <UiIcon name="globe" />
            </button>
          </div>
          <div className={styles.toolbar__cell}>
            <IconPicker editor={editor} />
          </div>
          <div className={styles.toolbar__cell}>
            <button
              className={classNames(
                styles.langToggle,
                currentLang === "ru" && styles["langToggle--active"],
              )}
              onClick={toggleLanguage}
            />
          </div>
        </div>
      )}
      <button
        onClick={toggleToolbar}
        className={classNames(
          styles.button,
          styles["button--highlighted"],
          !active && styles["button--unactive"],
        )}
      >
        <UiIcon name={activeToggleToolbarIcon} />
      </button>
    </div>
  );
};

export default Toolbar;
