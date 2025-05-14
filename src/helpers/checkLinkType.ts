import { formatHref } from "@/helpers/formatHref";

export const checkLinkType = (href: string) => {
  const formattedHref = formatHref(href);

  const isExternal = formattedHref.startsWith("http");
  const isMailto = formattedHref.startsWith("mailto:");
  const isTel = formattedHref.startsWith("tel:");

  return {
    isExternal,
    isMailto,
    isTel,
    formattedHref,
  };
};
