import { EMAIL_REGEX, PHONE_REGEX, URL_REGEX } from "@/constant/regex";

export const formatHref = (input: string): string => {
  if (URL_REGEX.test(input)) {
    return input.startsWith("http") ? input : `https://${input}`;
  }

  if (EMAIL_REGEX.test(input)) {
    return `mailto:${input}`;
  }

  if (PHONE_REGEX.test(input)) {
    return `tel:${input.replace(/[\s()-]/g, "")}`;
  }

  return input;
};
