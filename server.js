import express from 'express';
import { nanoid } from 'nanoid';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

const urlDatabase = {};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/shorten', (req, res) => {
  const originalUrl = req.body.url;
  const shortId = nanoid(7);
  urlDatabase[shortId] = originalUrl;
  res.send(`Shortened URL: <a href="/${shortId}">${req.headers.host}/${shortId}</a>`);
});

app.get('/:id', (req, res) => {
  const originalUrl = urlDatabase[req.params.id];
  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.status(404).send('URL not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
