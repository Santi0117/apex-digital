import { assistantContext, type ChatMessage } from "./assistant-context";
import { getChatResponse } from "./chatbot";
import type { Locale } from "./i18n/translations";

export function isOpenAIConfigured(): boolean {
  return Boolean(process.env.OPENAI_API_KEY?.trim());
}

export async function getAssistantReply(
  message: string,
  history: ChatMessage[] = [],
  locale: Locale = "es"
): Promise<{ reply: string; provider: "openai" | "fallback" }> {
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  if (!apiKey) {
    return {
      reply: getChatResponse(message, locale),
      provider: "fallback",
    };
  }

  try {
    const messages = [
      { role: "system" as const, content: assistantContext.systemPrompt },
      ...history.slice(-10).map((m) => ({
        role: m.role,
        content: m.content,
      })),
      { role: "user" as const, content: message },
    ];

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: assistantContext.model,
        messages,
        temperature: assistantContext.temperature,
        max_tokens: assistantContext.maxTokens,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("OpenAI error:", err);
      return {
        reply: getChatResponse(message, locale),
        provider: "fallback",
      };
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return {
        reply: getChatResponse(message, locale),
        provider: "fallback",
      };
    }

    return { reply, provider: "openai" };
  } catch (error) {
    console.error("OpenAI fetch failed:", error);
    return {
      reply: getChatResponse(message, locale),
      provider: "fallback",
    };
  }
}
