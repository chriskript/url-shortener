document.getElementById('urlForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const urlInput = document.getElementById('urlInput').value;
    const response = await fetch('/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: urlInput })
    });
    const data = await response.json();
    if (data.shortUrl) {
      document.getElementById('shortUrlInput').value = data.shortUrl;
      document.getElementById('shortenedUrl').style.display = 'block';
    }
  });
  