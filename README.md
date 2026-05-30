# playwright-cli-demo

A demo repository for exploring [Playwright CLI](https://github.com/microsoft/playwright-cli) browser automation alongside [Playwright Test](https://playwright.dev/docs/test-intro). The main example app under test is the official [TodoMVC demo](https://demo.playwright.dev/todomvc/).

## What’s in this repo

- **Playwright Test** — End-to-end tests in `e2e/` that run in Chromium, Firefox, and WebKit.
- **Playwright CLI** — Agent skills and config for driving the browser from the terminal (`playwright-cli open`, `click`, `snapshot`, `screenshot`, etc.).
- **TodoMVC exploration** — Manual CLI runs and screenshots documenting pass/fail flows against the demo app (screenshots are gitignored; see [Screenshots](#screenshots) below).
- **CI** — GitHub Actions workflow runs the full test suite on push and pull requests to `main` / `master`.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm

## Getting started

```bash
git clone https://github.com/bobando/playwright-cli-demo.git
cd playwright-cli-demo
npm ci
npx playwright install
```

Install Playwright CLI globally if you want the `playwright-cli` command without `npx`:

```bash
npm install -g @playwright/cli@latest
```

## Running Playwright tests

Run all tests in UI mode (all configured browsers):

```bash
npx playwright test --ui
```

Run only the TodoMVC test on Chromium:

```bash
npx playwright test e2e/todomvc.spec.js --project=chromium
```

Open the HTML report after a run:

```bash
npx playwright show-report
```

To avoid the report opening automatically in CI or scripts:

```bash
PLAYWRIGHT_HTML_OPEN=never npx playwright test
```

### TodoMVC test

`e2e/todomvc.spec.js` covers a positive flow on [https://demo.playwright.dev/todomvc/](https://demo.playwright.dev/todomvc/):

1. Add a todo item
2. Assert it appears in the list
3. Remove it via the destroy control
4. Assert the list is empty

## Using Playwright CLI

Browser defaults are defined in `.playwright/cli.config.json` (Chromium with the Edge channel).

```bash
# Open the demo app
playwright-cli open --config=.playwright/cli.config.json https://demo.playwright.dev/todomvc/

# Capture page state and interact using element refs from the snapshot
playwright-cli snapshot
playwright-cli fill e8 "Buy groceries" --submit
playwright-cli screenshot --filename=screenshots/todomvc/example.png

playwright-cli close
```

Agent-oriented documentation lives under:

- `.cursor/skills/playwright-cli/` — Cursor agent skill and reference docs
- `.claude/skills/playwright-cli/` — Claude Code skill (mirrored content)

For batch automation, `scripts/todomvc-failing-scenarios.js` can be run with:

```bash
playwright-cli run-code --filename=scripts/todomvc-failing-scenarios.js
```

That script exercises intentional failing assertions and saves screenshots under `screenshots/todomvc/`.

## Screenshots

Exploratory CLI runs can save PNGs to `screenshots/todomvc/` (pass and fail scenarios). That directory is listed in `.gitignore`; generate them locally with `playwright-cli screenshot` or the script above. A results manifest may be written to `screenshots/todomvc/TEST-RESULTS.json` when using the failing-scenarios script.

## Project layout

```
.
├── .github/workflows/playwright.yml   # CI: install browsers, run tests, upload report
├── .playwright/cli.config.json        # Playwright CLI browser settings
├── .cursor/skills/playwright-cli/     # Agent skill for Playwright CLI
├── e2e/
│   └── todomvc.spec.js                # TodoMVC add/remove test
├── playwright.config.js               # Playwright Test configuration
├── scripts/
│   └── todomvc-failing-scenarios.js   # CLI script for demo failure scenarios
└── screenshots/                     # Local screenshots (gitignored)
```

## Continuous integration

The [Playwright Tests](.github/workflows/playwright.yml) workflow:

1. Checks out the repo
2. Installs dependencies with `npm ci`
3. Installs Playwright browsers with system dependencies
4. Runs `npx playwright test`
5. Uploads the `playwright-report` artifact (retained 30 days)

## Learn more

- [Playwright Test documentation](https://playwright.dev/docs/intro)
- [Playwright CLI](https://github.com/microsoft/playwright-cli)
- [TodoMVC demo (Playwright)](https://demo.playwright.dev/todomvc/)

