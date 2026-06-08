# Auth0 Next.js Bootstrap

A Codex skill that creates a minimal Next.js app, installs the official Auth0
React SDK, configures an Auth0 Single Page Application in the Auth0 dashboard
through Chrome, and leaves the app ready for Universal Login.

## What It Builds

The skill creates an `auth0-demo` app with:

- `npx create-next-app@latest auth0-demo`
- `@auth0/auth0-react@2.x`
- A client-side Auth0 provider for Next.js App Router
- Login, signup, logout, and user profile UI
- Auth0 dashboard configuration for callback, logout, and web-origin URLs

## Prerequisites

Before using this skill, you need:

1. **Codex with skills support**

   Install either Codex Desktop or Codex CLI.

   - Codex product page: [openai.com/codex](https://openai.com/codex/)
   - Codex CLI repository: [github.com/openai/codex](https://github.com/openai/codex)

2. **Google Chrome**

   The skill configures Auth0 in a real signed-in browser session, so Chrome
   must be installed and available.

3. **Codex Chrome extension**

   Install the Codex Chrome extension and make sure it is connected to Codex:

   [Install Codex from the Chrome Web Store](https://chromewebstore.google.com/detail/codex/hehggadaopoacecdllhhajmbjkdcmajg?hl=en)

4. **Auth0 account**

   Create an Auth0 account before running the skill:

   [auth0.com/signup](https://auth0.com/signup)

   You should be logged into the Auth0 dashboard in Chrome, and your account
   must be able to create or update applications in the selected tenant.

5. **Node.js and npm**

   The skill uses `npx create-next-app@latest` and `npm install`. Current
   Next.js system requirements specify Node.js `20.9` or newer.

   - Node.js: [nodejs.org](https://nodejs.org/)
   - Next.js installation docs: [nextjs.org/docs/pages/getting-started/installation](https://nextjs.org/docs/pages/getting-started/installation)

6. **Git**

   Git is needed to clone this skill repository into your local skills folder.

7. **Network access and command permissions**

   Codex must be allowed to run shell commands, install npm packages, and use
   Chrome to edit Auth0 dashboard settings.

## Install

Clone this repository into one of Codex's local skills directories.

For `~/.agents/skills`:

```bash
mkdir -p ~/.agents/skills
git clone https://github.com/grp06/auth0-nextjs-bootstrap.git ~/.agents/skills/auth0-nextjs-bootstrap
```

For `~/.codex/skills`:

```bash
mkdir -p ~/.codex/skills
git clone https://github.com/grp06/auth0-nextjs-bootstrap.git ~/.codex/skills/auth0-nextjs-bootstrap
```

Restart Codex or start a fresh Codex thread after installing the skill.

## Use

Ask Codex:

```text
Use $auth0-nextjs-bootstrap to create a minimal Next.js Auth0 demo app end to end.
```

The skill expects Chrome to already be signed into Auth0. It will stop and ask
you to fix the browser state if Auth0 requires login, MFA, CAPTCHA, or another
interactive account step that Codex cannot complete automatically.

## Notes

- The default local origin is `http://localhost:3000`.
- If port `3000` is already occupied by an unrelated process, the skill should
  choose the next free port and use that same origin in the Auth0 dashboard.
- The Auth0 dashboard configuration is intentionally done through Chrome because
  it relies on the user's signed-in Auth0 session.
