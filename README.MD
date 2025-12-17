## DemoQA Playwright Automation

### Setup

- `npm install`
- `npx playwright install`

### Run

- `npm test`
- `npm run test:chrome`
- `npm run test:firefox`

### Notes

- Page objects live in `src/pages`, tests in `tests/`.
- Env flags: `runThis`, `VIEWPORT_WIDTH`, `VIEWPORT_HEIGHT`, `workers`.
- Reports and failure artifacts land in `playwright-report/` and `reports/`.
