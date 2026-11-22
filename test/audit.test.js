import test from "node:test";
import assert from "node:assert/strict";
import { scanProject } from "envpilot-dev";
import server from "../src/server.js";

test("src/server.js creates a valid HTTP server instance", () => {
  assert.ok(server);
  assert.equal(typeof server.listen, "function");
});

test("EnvPilot audit on clean root project reports zero missing or unused variables", async () => {
  const report = await scanProject(".");

  // Used should contain exactly the variables in src/server.js
  assert.deepEqual(report.used, ["APP_NAME", "NODE_ENV", "PORT"]);
  // Declared should match .env.example
  assert.deepEqual(report.declared, ["APP_NAME", "NODE_ENV", "PORT"]);
  // Discrepancy arrays must be completely empty
  assert.deepEqual(report.missingInEnv, []);
  assert.deepEqual(report.unusedInEnv, []);
  assert.deepEqual(report.duplicates, []);
});

test("EnvPilot audit on broken fixture accurately catches missing DATABASE_URL", async () => {
  const fixtureReport = await scanProject(".fixtures/missing-variable");

  assert.deepEqual(fixtureReport.used, ["DATABASE_URL", "PORT"]);
  assert.deepEqual(fixtureReport.declared, ["PORT"]);
  assert.deepEqual(fixtureReport.missingInEnv, ["DATABASE_URL"]);
  assert.deepEqual(fixtureReport.unusedInEnv, []);
});
