import http from "node:http";

// Reference environment variables via process.env.
// EnvPilot's static AST analysis detects these accesses at compile/audit time.
const PORT = Number.parseInt(process.env.PORT || "3000", 10);
const APP_NAME = process.env.APP_NAME || "EnvPilot Demo Service";
const NODE_ENV = process.env.NODE_ENV || "development";

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({
        status: "healthy",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
      })
    );
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify(
      {
        message: "EnvPilot Demo Application is running",
        app: APP_NAME,
        environment: NODE_ENV,
        port: PORT,
        status: "verified",
        audit: {
          scannedWith: "envpilot-dev@1.0.0",
          contract: ".env.example",
          expectedVariables: ["PORT", "APP_NAME", "NODE_ENV"]
        },
        links: {
          npm: "https://www.npmjs.com/package/envpilot-dev",
          demoRepo: "https://github.com/aryan118335/Demo-envpilot",
          originalRepo: "https://github.com/aryan118335/envpilot"
        }
      },
      null,
      2
    )
  );
});

// Start listening if run directly via `node src/server.js` or `npm start`
const isMain = process.argv[1] && process.argv[1].endsWith("server.js");
if (isMain) {
  server.listen(PORT, () => {
    console.log(`[${APP_NAME}] Server listening on port ${PORT} (${NODE_ENV})`);
    console.log(`[${APP_NAME}] Access http://localhost:${PORT}/ for API status`);
  });
}

export default server;
