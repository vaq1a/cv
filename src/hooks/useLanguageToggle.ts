import { useCallback, useState } from "react";

type Language = "en" | "ru";

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
