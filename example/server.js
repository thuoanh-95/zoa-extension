const path = require('path');

const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, 'www'), { maxAge: 360000 }));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'www', 'index.html'));
});

const port = 8080;

app.listen(port, () => console.log(`server running on port ${port}`));
