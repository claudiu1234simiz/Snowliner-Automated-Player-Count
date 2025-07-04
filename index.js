const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Stores team data and last update time
let latestTeamMembers = {};
let lastUpdate = null;

// 🟢 POST: Update team data from Roblox
app.post('/update-team-counts', (req, res) => {
  const { teams } = req.body;

  if (teams && typeof teams === 'object') {
    latestTeamMembers = teams;
    lastUpdate = new Date().toISOString();
    console.log(`✅ Team data updated @ ${lastUpdate}`);
    res.sendStatus(200);
  } else {
    console.warn('⚠️ Invalid update payload received');
    res.status(400).send('❌ Missing or invalid team data');
  }
});

// 🔵 GET: Retrieve current team data (for Discord bot)
app.get('/team-counts', (req, res) => {
  res.json({ teams: latestTeamMembers });
});

// 🧪 GET: Check server status
app.get('/status', (req, res) => {
  res.json({
    online: true,
    lastUpdate: lastUpdate || 'No data received yet'
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚄 Snowliner Player Tracker live at http://localhost:${PORT}`);
});
