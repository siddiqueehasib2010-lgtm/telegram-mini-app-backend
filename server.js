// --- Keep-Alive Server ---
// Render's free Web Services will shut down if they don't receive web traffic.
// This simple Express server keeps the service active by responding to Render's health checks.
const express = require('express');
const app = express();
// Render assigns a random port; we must use the one it provides.
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).send('Bot Status: Running OK');
});

app.listen(PORT, () => {
  console.log(`Keep-alive server listening on port ${PORT}`);
  
  // Start the main bot logic file
  require('./index.js');
});
