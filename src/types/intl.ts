export type Language = "en" | "ru";

export type AbstractIntlMessages = {
  [id: string]: AbstractIntlMessages | string;
};
