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

export const useEducationsForm = () => {
  const { toast } = useToast();
  const { currentLang, toggleLanguage } = useLanguageToggle();

  const [isMounted, setIsMounted] = useState(false);
  const [currentEducations, setCurrentEducations] = useState<Array<ResumeItem>>(
    [
      { lang: "ru", content: "" },
      { lang: "en", content: "" },
    ],
  );

  const currentContent = useMemo(
    () =>
      currentEducations.find((item) => item.lang === currentLang)?.content ??
      "",
    [currentEducations, currentLang],
  );

  const { mutate: setResume, isPending } = api.resume.setEducations.useMutation(
    {
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
    },
  );
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
    ],
    onUpdate: ({ editor }) => {
      setCurrentEducations(
        currentEducations.map((item) =>
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

  const handleSetEducations = () => {
    if (!currentEducations) {
      toast({
        description: FILL_FIELD_WARNING,
      });
    }

    setResume({
      educations: currentEducations,
    });
  };

  useEffect(() => {
    if (editor && currentContent !== editor.getHTML()) {
      editor.commands.setContent(currentContent);
    }
  }, [currentContent, editor]);

  useEffect(() => {
    if (editor && currentResume?.educations) {
      setCurrentEducations(currentResume.educations);
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
    handleSetEducations,
    toggleLanguage,
  };
};
