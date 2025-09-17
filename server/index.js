const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)){
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

// Save attendance for a date (YYYY-MM-DD)
app.post('/api/attendance/:date', (req, res) => {
  const date = req.params.date;
  const body = req.body;
  if (!body || !Array.isArray(body.students)) {
    return res.status(400).json({ error: 'Invalid payload. Expected { students: [...] }' });
  }
  const filePath = path.join(DATA_DIR, `${date}.json`);
  try {
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2), 'utf8');
    return res.json({ ok: true, saved: filePath });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to save' });
  }
});

// Load attendance for a date
app.get('/api/attendance/:date', (req, res) => {
  const date = req.params.date;
  const filePath = path.join(DATA_DIR, `${date}.json`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Not found' });
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(raw);
    return res.json({ ok: true, data: parsed });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to read' });
  }
});

app.listen(PORT, () => {
  console.log(`Ilm-Minar server listening on http://localhost:${PORT}`);
});
