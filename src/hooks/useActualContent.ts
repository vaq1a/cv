import type { ResumeItems } from "@/types/resume";
import { useLocale } from "next-intl";
import { useMemo } from "react";

export const useActualContent = (content: ResumeItems | undefined | null) => {
  const currentLocale = useLocale();

  const actualContent = useMemo(() => {
    return (
      content?.find?.((item) => item.lang === currentLocale)?.content ?? null
    );
  }, [content, currentLocale]);

  return {
    actualContent,
  };
};
