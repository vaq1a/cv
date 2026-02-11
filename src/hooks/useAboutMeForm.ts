import { useToast } from "@/hooks/use-toast";
import { useLanguageToggle } from "@/hooks/useLanguageToggle";
import { useEffect, useMemo, useState } from "react";
import type { ResumeItem } from "@/types/resume";
import { api } from "@/trpc/react";
import { useResume } from "@/hooks/useResume";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { IconExtension } from "@/extensions/IconExtension";
import {
  FILL_FIELD_WARNING,
  SAVE_DATA_SUCCESS_MESSAGE,
} from "@/constant/notifications";
import Link from "@tiptap/extension-link";
import { Indent } from "@/extensions/IndentExtension";
import {
  INDENT_MIN_LEVEL,
  INDENT_MAX_LEVEL,
  INDENT_TYPES,
} from "@/constant/editor";

export const useAboutMeForm = () => {
  const { toast } = useToast();
  const { currentLang, toggleLanguage } = useLanguageToggle();

  const [isMounted, setIsMounted] = useState(false);
  const [currentAboutMe, setCurrentAboutMe] = useState<Array<ResumeItem>>([
    { lang: "ru", content: "" },
    { lang: "en", content: "" },
  ]);

  const currentContent = useMemo(
    () =>
      currentAboutMe.find((item) => item.lang === currentLang)?.content ?? "",
    [currentAboutMe, currentLang],
  );

  const { mutate: setResume, isPending } = api.resume.setAboutMe.useMutation({
    onSuccess: () => {
      toast({
        description: SAVE_DATA_SUCCESS_MESSAGE,
      });
    },
    onError: (error) => {
      toast({
        description: `${error.message}`,
      });
    },
  });
  const { resume, isLoading } = useResume();
  const currentResume = resume?.[0];

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      IconExtension,
      Link.configure({
        protocols: ["tel", "mailto"],
      }),
      Indent.configure({
        types: [...INDENT_TYPES],
        minLevel: INDENT_MIN_LEVEL,
        maxLevel: INDENT_MAX_LEVEL,
      }),
    ],
    onUpdate: ({ editor }) => {
      setCurrentAboutMe(
        currentAboutMe.map((item) =>
          item.lang === currentLang
            ? {
                ...item,
                content: editor.getHTML(),
              }
            : item,
        ),
      );
    },
    immediatelyRender: false,
  });

  const handleSetAboutMe = () => {
    if (!currentAboutMe) {
      toast({
        description: FILL_FIELD_WARNING,
      });
    }

    setResume({
      aboutMe: currentAboutMe,
    });
  };

  useEffect(() => {
    if (editor && currentContent !== editor.getHTML()) {
      editor.commands.setContent(currentContent);
    }
  }, [currentContent, editor]);

  useEffect(() => {
    if (editor && currentResume?.aboutMe) {
      setCurrentAboutMe(currentResume.aboutMe);
    }
  }, [editor, currentResume]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return {
    isMounted,
    isLoading,
    isPending,
    editor,
    currentLang,
    handleSetAboutMe,
    toggleLanguage,
  };
};
