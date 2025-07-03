const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Store player names under each team
let latestTeamMembers = {};

app.post('/update-team-counts', (req, res) => {
  const { teams } = req.body; // Expecting { teams: { "Team Name": ["User1", "User2"] } }

  if (teams) {
    latestTeamMembers = teams;
    console.log('✅ Updated team members:', teams);
    res.sendStatus(200);
  } else {
    res.status(400).send('❌ Missing team data');
  }
});

app.get('/team-counts', (req, res) => {
  res.json({ teams: latestTeamMembers });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚄 Server live on port ${PORT}`));
