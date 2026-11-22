// Demonstration fixture: Intentionally references an undeclared environment variable.
// This allows visitors and automated tests to verify EnvPilot's error detection.

const port = Number.parseInt(process.env.PORT || "3000", 10);

// DATABASE_URL is referenced here in code, but intentionally omitted from .env.example
const databaseUrl = process.env.DATABASE_URL;

console.log(`[Broken Demo] Port: ${port}, Database: ${databaseUrl ? "(configured)" : "(undefined)"}`);
