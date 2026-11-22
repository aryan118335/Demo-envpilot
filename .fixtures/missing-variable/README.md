# Missing Variable Demonstration Scenario

This isolated fixture demonstrates how **EnvPilot** flags environment variables that are accessed in source code but omitted from configuration templates.

## Scenario Details

- **Referenced in code (`app.js`):** `PORT`, `DATABASE_URL`
- **Declared in template (`.env.example`):** `PORT`
- **Expected result:** `DATABASE_URL` reported as `Missing`

## How to Test This Scenario

Run the audit targeting this fixture directory:

```bash
# Terminal formatted output (warning shown)
npx envpilot check --dir .fixtures/missing-variable

# Or via npm script:
npm run env:demo-missing

# Strict mode (exits with code 1):
npx envpilot check --dir .fixtures/missing-variable --strict

# Machine-readable JSON output:
npx envpilot check --dir .fixtures/missing-variable --json
```

## Expected Output

```text
╔══════════════════════════════════╗
║       EnvPilot — Scan Report      ║
╚══════════════════════════════════╝

📁 Project : .../.fixtures/missing-variable
🔍 Used    : DATABASE_URL, PORT
📋 Declared: PORT
❌ Missing : DATABASE_URL
⚠️  Unused  : (none)
🔁 Dupes   : (none)

⚠️  Issues detected.
```
