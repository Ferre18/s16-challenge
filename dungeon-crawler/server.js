import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.static('.'));

app.post('/api/llm', async (req, res) => {
  try {
    const hfRes = await fetch('https://router.huggingface.co/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
      },
      body: JSON.stringify({
        model: 'deepseek-ai/DeepSeek-R1:fastest',
        messages: [
          {
            role: 'system',
            content: 'You are a game engine that returns ONLY valid JSON.',
          },
          {
            role: 'user',
            content: req.body.prompt,
          },
        ],
        stream: false,
      }),
    });

    const text = await hfRes.text();

    console.log('HF STATUS:', hfRes.status);
    console.log('HF RESPONSE BODY:', text);

    if (!hfRes.ok) {
      return res.status(hfRes.status).json({
        error: 'Hugging Face request failed',
        details: text,
      });
    }

    const hfJson = JSON.parse(text);
    const content = hfJson?.choices?.[0]?.message?.content || '';

    res.json({ content });
  } catch (err) {
    console.error('SERVER CRASH:', err);
    res.status(500).json({
      error: err.message,
    });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});