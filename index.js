const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, IS117! Your web server is working.');
});

app.get('/about', (req, res) => {
  res.send('A web server receives a request and sends a response.');
});

app.use((req, res) => {
  res.status(404);
  res.send('Page not found.');
});

if (require.main === module) {
  app.listen(3000, (error) => {
    if (error) {
      console.error(error);
      process.exitCode = 1;
      return;
    }
    console.log('Server running at http://localhost:3000');
    console.log('Press Ctrl+C to stop the server.');
  });
}

module.exports = app;
