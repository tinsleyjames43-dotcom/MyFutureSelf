import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate", async (req, res) => {
  const { name, age, interests } = req.body;

  const prompt = `
  You are an AI that predicts a person's future life.

  Person:
  Name: ${name}
  Age: ${age}
  Interests: ${interests}

  Give:
  1. Future job
  2. Lifestyle description
  3. Personality change
  4. A short 5-10 year future story

  Make it exciting but realistic.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      result: response.choices[0].message.content,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("FutureYou AI running on http://localhost:3000");
});
