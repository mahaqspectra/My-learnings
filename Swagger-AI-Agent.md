# Swagger AI Agent

## Project Overview

The Swagger AI Agent is an API-first Node.js + TypeScript platform that provides programmatic automation and test-generation features driven by Swagger/OpenAPI and language models. It is inspired by a no-code UI automation architecture and is designed to be modular, testable, and extendable with clear separation between domain logic and infrastructure.

Key goals:
- Parse API/feature specifications and generate executable automation (Playwright/other runners)
- Provide MCP (machine control protocol) adapters such as Playwright
- Use LLMs for fallback tasks like locator suggestion, code generation, and healing
- Keep controllers thin and orchestration inside use-cases

## Project Principles

- One file / one responsibility at a time
- Domain layer has zero external dependencies
- Infrastructure contains no business logic
- Controllers only validate input and call use-cases
- Pure functions inside application logic where possible

## Expected Folder Structure

This repository follows a strict modular layout (adapt as needed):

```
Swagger-AI-Agent-7-12-25/
├─ .env
├─ config/
├─ logs/
├─ src/
│  ├─ core/
│  ├─ api/
│  ├─ application/
│  ├─ domain/
│  ├─ infrastructure/
│  └─ utils/
└─ tests/
```

The `src` layout should reflect clean architecture boundaries (controllers, use-cases, domain models, infrastructure adapters).

## Required APIs (high-level)

The agent should expose the following API groups (examples):

- Feature parsing: `POST /feature/parse`, `POST /feature/validate-syntax`
- Step mapping: `POST /mapping/map-step`, `POST /mapping/map-scenario`, `POST /mapping/check-step`
- MCP (Playwright) tools: many endpoints under `/mcp/playwright/*` for navigation, click/type, screenshots, tracing, tabs, generate-test, batch-execute
- LLM endpoints: `POST /llm/suggest-locator`, `POST /llm/generate-step-code`, `POST /llm/generate-full-spec`, `POST /llm/heal-step`
- Execution orchestration: `POST /execution/run`, `GET /execution/status/:runId`, `POST /execution/retry-step`

These align with the design decisions for modular MCP/LLM integration and incremental spec generation.

## Incremental Development Plan (recommended)

Phase 1 — Project setup
- Initialize Node.js + TypeScript
- Create strict folder structure and environment loaders
- Add logger (winston), Express server bootstrap, error-handler middleware

Phase 2 — Domain layer
- Implement domain models (Feature, Scenario, Step, MappedStep, Locator, TestPlan)
- Define repository interfaces (no external calls)

Phase 3 — Infrastructure skeleton
- MCP client factory, Playwright adapter stubs
- LLM client factory and dummy implementations for persistence

Phase 4 — Feature parsing
- `parse-feature` and `validateFeatureSyntax` use-cases + controllers/routes

Phase 5 — Step mapping
- Implement mapping use-cases, synonym resolution utils, mapping endpoints

Phase 6 — MCP execution
- Implement Playwright MCP tools and endpoints

Phase 7 — LLM integration
- Locator suggestion, code generation, healing flows

Phase 8 — Execution
- Test orchestrator use-case, runner integration, artifact handling

Phase 9 — E2E
- Parse → Map → Generate → Execute; LLM fallback handling

Phase 10 — Hardening
- Validation, structured logs, retries, rate limiting, tests

## Artifacts & Specs (capabilities)

- Artifacts: videos, traces, screenshots saved under `artifacts/{runId}/` with an organized structure (`videos/`, `traces/`, `screenshots/`).
- Spec generation: incremental spec writer that appends generated step code to `artifacts/{runId}/specs/{scriptId}.spec.ts` when `scriptId` is provided.

## Quick Start (developer)

1. Install dependencies:

```powershell
cd "c:\Users\lenovo\Swagger-AI Agent-7-12-25"
npm install
```

2. Build:

```powershell
npm run build
```

3. Run in development (example):

```powershell
npm run dev
```

4. Run tests:

```powershell
npm test
```

Adjust scripts in `package.json` to match the repo's actual scripts.

## Contributing

- Follow the folder rules and single-responsibility guidelines.
- Create small, focused PRs touching one module at a time.
- Add JSDoc on public functions and keep use-cases free of side effects where possible.

## Next Steps (for you)

- Tell me which module you want implemented next (e.g., `feature.parse` use-case, `mcp/playwright` controller, or `llm` factory).
- I will implement one file at a time and ask for review after each change.

---

If you'd like, I can now implement the first file (project bootstrap: `src/core/app.ts` and `src/core/server.ts`) or create the `src` folder skeleton. Which module should I implement next?
