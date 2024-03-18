const express = require("express");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const App = require("../src/App"); // Assuming your React App component is in App.js
require("@babel/register");

const server = express();
const port = process.env.PORT || 3100;

server.use(cookieParser());
server.use(compression());

// Serve static files if needed
server.use(express.static("public"));

server.post("/events", (req, res) => {
  return res.send("success");
});

server.post("/events/", (req, res) => {
  return res.send("success");
});

server.get("/reset-cache", (req, res) => {
  cache.resetCache();
  return res.send("success");
});

server.get("/readiness", (req, res) => {
  return res.send("ok");
});

// Handle all other requests
server.get("*", (req, res) => {
  const appHtml = ReactDOMServer.renderToString(<App />);
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>React App</title>
    </head>
    <body>
      <div id="root">${appHtml}</div>
      <script src="/bundle.js"></script> <!-- Assuming your bundle file is named bundle.js -->
    </body>
    </html>
  `);
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
