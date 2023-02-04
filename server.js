const express = require('express');
const data = require('./data');

const app = express();

app.get('/api/categories', (req, res) => {
  res.send(data.categories);
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
