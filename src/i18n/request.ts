import { getRequestConfig } from "next-intl/server";
import { type AbstractIntlMessages } from "@/types/intl";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const currentLocaleData = (await import(`../messages/${locale}.json`)) as {
    default: AbstractIntlMessages;
  };

  const messages = currentLocaleData.default;

  return {
    locale,
    messages,
  };
});
