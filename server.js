const http = require("http");
const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "public");
const port = process.env.PORT || 3000;

const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon"
};

http.createServer((req, res) => {
  const pathname = decodeURIComponent(req.url.split("?")[0]);
  let filePath = pathname === "/" ? path.join(publicDir, "index.html") : path.join(publicDir, pathname);
  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isDirectory()) filePath = path.join(filePath, "index.html");
    fs.readFile(filePath, (readErr, data) => {
      if (readErr) {
        res.writeHead(404, {"Content-Type":"text/plain; charset=utf-8"});
        return res.end("Not found");
      }
      res.writeHead(200, {"Content-Type": mime[path.extname(filePath)] || "application/octet-stream"});
      res.end(data);
    });
  });
}).listen(port, "0.0.0.0", () => {
  console.log(`Thinking Creative listening on ${port}`);
});
