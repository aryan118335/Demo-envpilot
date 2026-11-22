# EnvPilot — Demo Project

[![EnvPilot CI Audit](https://github.com/aryan118335/Demo-envpilot/actions/workflows/envpilot-check.yml/badge.svg)](https://github.com/aryan118335/Demo-envpilot/actions/workflows/envpilot-check.yml)
[![Deploy Demo to GitHub Pages](https://github.com/aryan118335/Demo-envpilot/actions/workflows/deploy-demo.yml/badge.svg)](https://github.com/aryan118335/Demo-envpilot/actions/workflows/deploy-demo.yml)
[![npm version](https://img.shields.io/badge/npm-envpilot--dev%401.0.0-cb3837.svg)](https://www.npmjs.com/package/envpilot-dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org)

> **Live Demonstration & Evaluation Repository** for the published npm package [`envpilot-dev`](https://www.npmjs.com/package/envpilot-dev).
> 
> 🌐 **Live Deployed Demo Site:** [https://aryan118335.github.io/Demo-envpilot/](https://aryan118335.github.io/Demo-envpilot/)

---

## 📌 Repository Roles & Links

To distinguish between the original library source and this demonstration project:

| Resource | Description | URL |
|---|---|---|
| **Original Package Source** | Core AST auditor engine & TypeScript source | [github.com/aryan118335/envpilot](https://github.com/aryan118335/envpilot) |
| **Published npm Package** | Official published binary package (`1.0.0`) | [npmjs.com/package/envpilot-dev](https://www.npmjs.com/package/envpilot-dev) |
| **Demo Project (This Repo)** | Consumer demo application & CI verification | [github.com/aryan118335/Demo-envpilot](https://github.com/aryan118335/Demo-envpilot) |
| **Live Showcase Site** | Interactive evaluator dashboard on GitHub Pages | [aryan118335.github.io/Demo-envpilot](https://aryan118335.github.io/Demo-envpilot/) |

---

## 📖 Overview & Purpose

**EnvPilot** is a developer-first environment configuration auditor for JavaScript and TypeScript projects. It uses the official TypeScript compiler AST (Abstract Syntax Tree) to parse source code, tracking all accesses to `process.env.*` and comparing them against `.env` and `.env.example` declaration templates.

This repository demonstrates:
1. **Real Installation:** Installing the published `envpilot-dev@1.0.0` from npm as a development dependency.
2. **Clean Project Audit:** How a compliant Node.js ES module application passes strict auditing with zero missing, unused, or duplicate variables.
3. **Discrepancy Detection:** An isolated fixture scenario intentionally missing a required variable (`DATABASE_URL`) to show how EnvPilot catches configuration drift.
4. **Automated CI Guardrails:** A GitHub Actions workflow (`envpilot-check.yml`) that runs `envpilot check --strict` on every commit.
5. **Interactive Evaluator Portal:** A static web showcase in `docs/` deployed via GitHub Pages.

---

## 📁 Project Structure

```text
Demo-envpilot/
├── .fixtures/
│   └── missing-variable/
│       ├── app.js            # Fixture referencing PORT and DATABASE_URL
│       ├── .env.example      # Fixture template declaring only PORT
│       └── README.md         # Fixture testing instructions
├── .github/
│   └── workflows/
│       ├── envpilot-check.yml # CI workflow running strict audit & tests
│       └── deploy-demo.yml    # GitHub Pages deployment workflow
├── docs/
│   └── index.html            # Responsive live demonstration web portal
├── src/
│   └── server.js             # Node.js HTTP service using process.env
├── test/
│   └── audit.test.js         # Native node:test suite verifying audits
├── .env.example              # Clean environment template contract
├── .envpilot.json            # EnvPilot configuration file
├── .gitignore                # Excludes secrets, node_modules, reports
├── LICENSE                   # MIT License
├── package.json              # Scripts & envpilot-dev@1.0.0 devDependency
└── README.md                 # Project documentation
```

---

## ⚡ Prerequisites

- **Node.js:** `>= 18.0.0` (LTS recommended, tested on Node 18, 20, 22)
- **npm:** `>= 9.0.0`

---

## 🚀 Installation

Clone this repository and install dependencies using `npm ci` (or `npm install`):

```bash
git clone https://github.com/aryan118335/Demo-envpilot.git
cd Demo-envpilot
npm ci
```

Notice in `package.json` that `envpilot-dev` is installed directly from the public npm registry:

```json
"devDependencies": {
  "envpilot-dev": "^1.0.0"
}
```

---

## 🏃 Running the Demo Application

Start the simple Node.js HTTP server:

```bash
npm start
```

Output:
```text
[EnvPilot Demo Service] Server listening on port 3000 (development)
[EnvPilot Demo Service] Access http://localhost:3000/ for API status
```

You can test the endpoints:

```bash
# Health check endpoint
curl http://localhost:3000/health

# Application status endpoint
curl http://localhost:3000/
```

Response payload:
```json
{
  "message": "EnvPilot Demo Application is running",
  "app": "EnvPilot Demo Service",
  "environment": "development",
  "port": 3000,
  "status": "verified",
  "audit": {
    "scannedWith": "envpilot-dev@1.0.0",
    "contract": ".env.example",
    "expectedVariables": [
      "PORT",
      "APP_NAME",
      "NODE_ENV"
    ]
  }
}
```

---

## 🔍 Running EnvPilot Audits

The demo provides several npm scripts to run the installed `envpilot` CLI:

### 1. Clean Strict Audit (Default CI Mode)

Runs `envpilot check --strict` on the root demo project:

```bash
npm run env:check
```

**Expected Successful Output:**

```text
╔══════════════════════════════════╗
║       EnvPilot — Scan Report      ║
╚══════════════════════════════════╝

📁 Project : /Users/aryan/Desktop/Demo-envpilot
🔍 Used    : APP_NAME, NODE_ENV, PORT
📋 Declared: APP_NAME, NODE_ENV, PORT
❌ Missing : (none)
⚠️  Unused  : (none)
🔁 Dupes   : (none)

✅ No issues found.
```
Exit code is `0`.

---

### 2. Generate JSON Audit Report

Generates a machine-readable JSON report file (`envpilot-report.json`):

```bash
npm run env:report
```

Output:
```text
✅ Report saved to /.../Demo-envpilot/envpilot-report.json
   3 used | 3 declared | 0 missing | 0 unused | 0 duplicates
```

Generated content (`envpilot-report.json`):
```json
{
  "generatedAt": "2026-11-22T17:42:02.171Z",
  "projectDir": "/Users/aryan/Desktop/Demo-envpilot",
  "used": [
    "APP_NAME",
    "NODE_ENV",
    "PORT"
  ],
  "declared": [
    "APP_NAME",
    "NODE_ENV",
    "PORT"
  ],
  "missingInEnv": [],
  "unusedInEnv": [],
  "duplicates": []
}
```

---

### 3. Print JSON Directly to Terminal

```bash
npm run env:json
```

---

### 4. Reproducing a Missing-Variable Finding

An isolated fixture located at `.fixtures/missing-variable/` contains code that references `DATABASE_URL`, but omits it from its `.env.example`:

Run the scan against the fixture:

```bash
npm run env:demo-missing
# Or:
npx envpilot check --dir .fixtures/missing-variable
```

**Expected Finding Output:**

```text
╔══════════════════════════════════╗
║       EnvPilot — Scan Report      ║
╚══════════════════════════════════╝

📁 Project : /.../Demo-envpilot/.fixtures/missing-variable
🔍 Used    : DATABASE_URL, PORT
📋 Declared: PORT
❌ Missing : DATABASE_URL
⚠️  Unused  : (none)
🔁 Dupes   : (none)

⚠️  Issues detected.
```

In strict mode (`npx envpilot check --dir .fixtures/missing-variable --strict`), the command fails and exits with status code `1`, preventing unsafe builds.

---

### 5. Running the Automated Test Suite

Run the native Node.js test suite:

```bash
npm test
```

Verifies:
- `src/server.js` starts and exports a valid server instance.
- Programmatic `scanProject(".")` produces clean audit sets.
- Programmatic `scanProject(".fixtures/missing-variable")` catches `DATABASE_URL`.

---

## ⚙️ Configuration (`.envpilot.json`)

Project exclusions are managed in `.envpilot.json`:

```json
{
  "rootDir": ".",
  "ignore": [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/coverage/**",
    "**/.git/**",
    "**/.fixtures/**"
  ],
  "strict": false
}
```

---

## 🛡️ Security & Zero Exposure Guarantee

1. **No Value Parsing:** EnvPilot parses only variable names / keys. Secret values (passwords, tokens, keys) are **never** logged, saved, or exposed.
2. **No Committed Secrets:** No `.env` file is committed. Only `.env.example` containing safe placeholders is tracked.
3. **100% Offline:** EnvPilot operates completely locally without network calls.

---

## 🤖 GitHub Actions CI/CD

This repository includes two GitHub Actions workflows:

1. **`envpilot-check.yml` (CI Audit):**
   - Automatically triggered on every push and PR to `main`.
   - Runs `npm ci`.
   - Runs `npm run env:check` (strict audit).
   - Validates that the `.fixtures/missing-variable` scenario fails strict mode as expected.
   - Generates and uploads `envpilot-report.json` as a build artifact.
   - Runs `npm test`.

2. **`deploy-demo.yml` (GitHub Pages Deployment):**
   - Deploys the evaluator web application in `docs/` to GitHub Pages.

---

## 📜 License

This demonstration project is licensed under the [MIT License](LICENSE).
