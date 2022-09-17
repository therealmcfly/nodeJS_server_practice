const http = require("http");

const server = http.createServer((req, res) => {
  console.log("server is running");
  res.writeHead(200, { "content-type": "text/html" });
  res.write("<h1>Welcome to My Home Page!</h1>");
  res.end();
});

server.listen(5000);
