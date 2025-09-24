import axios from "axios";

export const generateFromPrompt = async (prompt) => {
  // Funcion asincrona para manejar la peticion con axios
  const res = await axios.post("http://localhost:11434/api/chat", {
    model: "deepseek-r1:1.5b",
    messages: [
      {
        role: "system",
        content:
          "Eres un asistente amigable, breve y con un tono casual. Siempre explicas los pasos claramente.",
      },
      { role: "user", content: prompt },
    ],
    stream: false,
  });
  return res.data.message.content;
};
