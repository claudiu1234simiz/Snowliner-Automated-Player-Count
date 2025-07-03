const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

let latestTeamCounts = {};

app.post('/update-team-counts', (req, res) => {
  const { counts } = req.body;
  if (counts) {
    latestTeamCounts = counts;
    console.log('Updated team counts:', counts);
    res.sendStatus(200);
  } else {
    res.status(400).send('Missing data');
  }
});

app.get('/team-counts', (req, res) => {
  res.json({ counts: latestTeamCounts });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚄 Server live on port ${PORT}`));
