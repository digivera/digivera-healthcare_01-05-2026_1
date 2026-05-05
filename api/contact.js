const TARGET_URL = 'https://processmail.md-client.com/api/inquiry';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const upstream = await fetch(TARGET_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    const text = await upstream.text();
    res.status(upstream.status).send(text);
  } catch {
    res.status(500).json({ error: 'Failed to reach upstream API' });
  }
}
