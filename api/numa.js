export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { message } = req.body;
  if (!message) {
    res.status(400).json({ error: "Message is required" });
    return;
  }

  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.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}`, // Tu clave oculta
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

    const data = await completion.json();

    if (data.error) {
      res.status(500).json({ error: data.error.message });
      return;
    }

    res.status(200).json({ result: data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
