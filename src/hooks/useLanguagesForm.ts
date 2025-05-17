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

export const useLanguagesForm = () => {
  const { toast } = useToast();
  const { currentLang, toggleLanguage } = useLanguageToggle();

  const [isMounted, setIsMounted] = useState(false);
  const [currentLanguages, setCurrentLanguages] = useState<Array<ResumeItem>>([
    { lang: "ru", content: "" },
    { lang: "en", content: "" },
  ]);

  const currentContent = useMemo(
    () =>
      currentLanguages.find((item) => item.lang === currentLang)?.content ?? "",
    [currentLanguages, currentLang],
  );

  const { mutate: setResume, isPending } = api.resume.setLanguages.useMutation({
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
        types: ["listItem", "paragraph", "heading"],
        minLevel: 0,
        maxLevel: 8,
      }),
    ],
    onUpdate: ({ editor }) => {
      setCurrentLanguages(
        currentLanguages.map((item) =>
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

  const handleSetLanguages = () => {
    if (!currentLanguages) {
      toast({
        description: FILL_FIELD_WARNING,
      });
    }

    setResume({
      languages: currentLanguages,
    });
  };

  useEffect(() => {
    if (editor && currentContent !== editor.getHTML()) {
      editor.commands.setContent(currentContent);
    }
  }, [currentContent, editor]);

  useEffect(() => {
    if (editor && currentResume?.languages) {
      setCurrentLanguages(currentResume.languages);
    }
  }, [editor, currentResume]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return {
    isMounted,
    isLoading,
    editor,
    currentLang,
    handleSetLanguages,
    toggleLanguage,
  };
};
