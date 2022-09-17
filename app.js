const http = require("http");

const server = http.createServer((req, res) => {
  console.log("server is running");
  res.end("Welcome to My Home Page!");
});

server.listen(5000);
