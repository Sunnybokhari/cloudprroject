const express = require('express');
const app = express();
const port = process.env.PORT || 3001; // Choose a port to listen on

app.use(express.json()); // Middleware to parse JSON bodies

// Test route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});
