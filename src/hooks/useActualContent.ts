import { useLocale } from "next-intl";
import { useMemo } from "react";

type LocalizedContent = {
  lang: "ru" | "en";
  content: string;
};

export const useActualContent = (
  content: LocalizedContent[] | undefined | null,
) => {
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
