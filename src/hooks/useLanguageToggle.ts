import type { Language } from "@/types/intl";
import { useCallback, useState } from "react";

export const useLanguageToggle = (defaultLang: Language = "en") => {
  const [currentLang, setCurrentLang] = useState<Language>(defaultLang);

  const toggleLanguage = useCallback(() => {
    setCurrentLang((prevLang) => (prevLang === "en" ? "ru" : "en"));
  }, []);

  return {
    currentLang,
    toggleLanguage,
  };
};
