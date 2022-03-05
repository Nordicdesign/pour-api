import http from 'http';
import app from './app.js';
const PORT = process.env.PORT || 5000;

// designates what port the app will listen to for incoming requests
const server = http.createServer(app);
server.listen(PORT, function () {
  console.log(`App listening on port ${PORT}`);
});
