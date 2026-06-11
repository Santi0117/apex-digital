import { translations, type Locale } from "./i18n/translations";

export function getChatResponse(message: string, locale: Locale = "es"): string {
  const { chatRules, defaultReply } = translations[locale].assistant;

  const normalized = message
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

  for (const rule of chatRules) {
    if (rule.keywords.some((kw) => normalized.includes(kw))) {
      return rule.reply;
    }
  }

  return defaultReply;
}
