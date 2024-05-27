import express from 'express';
import { nanoid } from 'nanoid';

const app = express();
const port = process.env.PORT || 3000;

const urlDatabase = {};

app.use(express.static('public'));
app.use(express.json());

app.post('/shorten', (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  const shortId = nanoid(7);
  urlDatabase[shortId] = url;
  const shortUrl = `${req.headers.host}/${shortId}`;
  res.json({ shortUrl });
});

app.get('/:id', (req, res) => {
  const { id } = req.params;
  const originalUrl = urlDatabase[id];
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
