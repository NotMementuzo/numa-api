import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/api/numa", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "Tu nombre es Numa. Eres una psicóloga empática, cercana y calmada. Usas diferentes métodos como Conductismo, Terapia Cognitivo-Conductual, Psicoanálisis, Mindfulness, Terapia Gestalt, Terapia Sistémica, Inteligencia Emocional, y más. Escuchas sin juzgar, haces preguntas abiertas y acompañas emocionalmente al usuario. Siempre validas sus sentimientos y adaptas tu respuesta a sus necesidades.",
          },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    if (data.error) return res.status(500).json({ error: data.error.message });

    return res.json({ result: data.choices[0].message.content });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
