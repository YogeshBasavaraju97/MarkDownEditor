const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { marked } = require('marked');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route for Markdown to HTML conversion
app.post('/markDown', (req, res) => {
  const { markdown } = req.body;
  if (!markdown) {
    return res.status(400).json({ error: 'No Markdown text provided' });
  }

  // Convert Markdown to HTML
  const html = marked(markdown);
  res.json({ html });
});

const PORT = 7777;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
