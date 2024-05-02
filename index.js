const http = require("http");
const { PORT = 8000 } = process.env;

const fs = require("fs");
const path = require("path");
const PUBLIC_DIR = path.join(__dirname, "public");

const {
  people,
  getData,
  getDatabyId,
  deleteDatabyId,
  getDatabyUsername,
} = require("./people");

const onRequest = (req, res) => {
  const splitedUrl = req.url.split("/")[2];
  const id = +splitedUrl;

  const fileHtml = path.join(PUBLIC_DIR, "./index.html");

  if (req.method === "GET") {
    if (req.url === "/people") getData(req, res);
    else if (req.url === "/home" || req.url === "/")
      res.setHeader("Content-Type", "text/html").end(fileHtml);
    else if (req.url === `/people/${id}`) getDatabyId(req, res, id);
    else if (req.url === `/people/${splitedUrl}`)
      getDatabyUsername(req, res, splitedUrl);
    else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.write("404 Data Not Found");
      res.end();
    }
  } else if (req.method === "DELETE") deleteDatabyId(req, res, id);
};

const server = http.createServer(onRequest);
server.listen(PORT, "localhost", () => {
  console.log("Server is running on http://localhost:8000");
});
