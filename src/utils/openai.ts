const apiKey = import.meta.env.VITE_OPENAI_KEY;

const BASE_URL = "https://api.openai.com/v1/chat/completions";
const HEADER = {
  Authorization: `Bearer ${apiKey}`,
  "Content-Type": "application/json",
};
export const callOpenAi = async (content: string): Promise<string> => {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: HEADER,
    body: JSON.stringify({
      model: "gpt-3.5",
      messages: [
        {
          role: "user",
          content,
        },
      ],
    }),
  });
  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "(No response)";
};
