# Auth0 Next.js Bootstrap

A Codex skill for going from zero to a working Auth0 + Next.js app.

It creates a minimal Next.js project, installs the official Auth0 React SDK,
wires up login/signup/logout/profile UI, and uses Chrome to configure the Auth0
dashboard for the right callback, logout, and web-origin URLs.

## What You Get

- A fresh `auth0-demo` app from `npx create-next-app@latest`
- `@auth0/auth0-react@2.x`
- A client-side Auth0 provider for the Next.js App Router
- Signup, login, logout, and user profile display
- Auth0 dashboard settings configured for your local dev origin

## Prerequisites

Before running the skill, make sure you have:

- **Codex Desktop or Codex CLI**

  Start here: [openai.com/codex](https://openai.com/codex/)  
  CLI repo: [github.com/openai/codex](https://github.com/openai/codex)

- **Google Chrome**

  The skill uses your signed-in Chrome session to configure Auth0.

- **Codex Chrome extension**

  Install it from the Chrome Web Store:  
  [Codex Chrome extension](https://chromewebstore.google.com/detail/codex/hehggadaopoacecdllhhajmbjkdcmajg?hl=en)

- **An Auth0 account**

  Create one here: [auth0.com/signup](https://auth0.com/signup)

  You should already be logged into the Auth0 dashboard in Chrome, with access
  to create or update applications in your tenant.

- **Node.js and npm**

  The skill runs `npx create-next-app@latest` and `npm install`. Current Next.js
  requirements call for Node.js `20.9` or newer.

  Node.js: [nodejs.org](https://nodejs.org/)  
  Next.js install docs: [nextjs.org/docs/pages/getting-started/installation](https://nextjs.org/docs/pages/getting-started/installation)

- **Git**

  Used to clone this skill into your local skills folder.

## Install

Clone the skill into a Codex skills directory:

```bash
mkdir -p ~/.agents/skills
git clone https://github.com/grp06/auth0-nextjs-bootstrap.git ~/.agents/skills/auth0-nextjs-bootstrap
```

If your Codex setup uses `~/.codex/skills` instead:

```bash
mkdir -p ~/.codex/skills
git clone https://github.com/grp06/auth0-nextjs-bootstrap.git ~/.codex/skills/auth0-nextjs-bootstrap
```

Then restart Codex or start a fresh thread.

## Use

Ask Codex:

```text
Use $auth0-nextjs-bootstrap to create a minimal Next.js Auth0 demo app end to end.
```

The skill assumes Chrome is already signed into Auth0. If Auth0 asks for login,
MFA, CAPTCHA, or account selection, Codex will pause and ask you to handle that
browser step.

## Notes

- Default local origin: `http://localhost:3000`
- If port `3000` is busy, the skill should choose another port and use that
  same origin in Auth0.
- Codex needs permission to run shell commands, install npm packages, and use
  Chrome to edit Auth0 dashboard settings.
