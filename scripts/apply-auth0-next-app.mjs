import fs from "node:fs";
import path from "node:path";
import process from "node:process";

function parseArgs(argv) {
  const args = {
    projectDir: ".",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === "--project-dir") {
      args.projectDir = next;
      index += 1;
    } else if (arg === "--domain") {
      args.domain = next;
      index += 1;
    } else if (arg === "--client-id") {
      args.clientId = next;
      index += 1;
    } else if (arg === "--origin") {
      args.origin = next;
      index += 1;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (!args.domain) throw new Error("Missing --domain");
  if (!args.clientId) throw new Error("Missing --client-id");
  if (!args.origin) throw new Error("Missing --origin");

  return args;
}

function findAppDir(projectDir) {
  const candidates = [path.join(projectDir, "app"), path.join(projectDir, "src", "app")];
  const appDir = candidates.find((candidate) => fs.existsSync(candidate));

  if (!appDir) {
    throw new Error("Could not find app/ or src/app/ in the project");
  }

  return appDir;
}

function updateLayout(layoutPath) {
  let layout = fs.readFileSync(layoutPath, "utf8");

  if (!layout.includes("./auth0-provider")) {
    layout = layout.replace(
      'import "./globals.css";',
      'import { Auth0ProviderWithConfig } from "./auth0-provider";\nimport "./globals.css";',
    );
  }

  layout = layout.replace(
    /title:\s*"[^"]*"/,
    'title: "Auth0 Authentication Demo"',
  );
  layout = layout.replace(
    /description:\s*"[^"]*"/,
    'description: "Authentication demo using the Auth0 React SDK"',
  );

  if (!layout.includes("<Auth0ProviderWithConfig>{children}</Auth0ProviderWithConfig>")) {
    const wrapped = layout.replace(
      /<body([^>]*)>\s*{children}\s*<\/body>/,
      `<body$1>
        <Auth0ProviderWithConfig>{children}</Auth0ProviderWithConfig>
      </body>`,
    );

    if (wrapped === layout) {
      throw new Error("Could not wrap children in app/layout.tsx");
    }

    layout = wrapped;
  }

  fs.writeFileSync(layoutPath, layout);
}

function writeProvider(appDir, { domain, clientId, origin }) {
  fs.writeFileSync(
    path.join(appDir, "auth0-provider.tsx"),
    `"use client";

import { Auth0Provider } from "@auth0/auth0-react";

const auth0RedirectUri =
  typeof window === "undefined" ? "${origin}" : window.location.origin;

type Auth0ProviderWithConfigProps = {
  children: React.ReactNode;
};

export function Auth0ProviderWithConfig({
  children,
}: Auth0ProviderWithConfigProps) {
  return (
    <Auth0Provider
      domain="${domain}"
      clientId="${clientId}"
      authorizationParams={{ redirect_uri: auth0RedirectUri }}
    >
      {children}
    </Auth0Provider>
  );
}
`,
  );
}

function writePage(appDir) {
  fs.writeFileSync(
    path.join(appDir, "page.tsx"),
    `"use client";

import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const {
    error,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    logout: auth0Logout,
    user,
  } = useAuth0();

  const signup = () =>
    loginWithRedirect({ authorizationParams: { screen_hint: "signup" } });

  const logout = () =>
    auth0Logout({ logoutParams: { returnTo: window.location.origin } });

  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-zinc-50 px-6 py-12 text-zinc-950 dark:bg-black dark:text-zinc-50">
      <section className="w-full max-w-2xl rounded-lg border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mb-8">
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Auth0 React SDK
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal">
            Authentication demo
          </h1>
          <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Sign up or log in with Universal Login, then view the profile
            returned by Auth0.
          </p>
        </div>

        {isLoading ? (
          <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
        ) : isAuthenticated ? (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                Logged in as
              </p>
              <p className="mt-1 text-lg font-semibold">
                {user?.email ?? user?.name ?? "Authenticated user"}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">User Profile</h2>
              <pre className="mt-3 max-h-96 overflow-auto rounded-md bg-zinc-100 p-4 text-sm leading-6 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                {JSON.stringify(user, null, 2)}
              </pre>
            </div>

            <button
              className="inline-flex h-11 items-center justify-center rounded-md bg-zinc-950 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
              onClick={logout}
              type="button"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {error ? (
              <p className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
                Error: {error.message}
              </p>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                className="inline-flex h-11 items-center justify-center rounded-md bg-zinc-950 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
                onClick={signup}
                type="button"
              >
                Signup
              </button>
              <button
                className="inline-flex h-11 items-center justify-center rounded-md border border-zinc-300 px-5 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
                onClick={() => loginWithRedirect()}
                type="button"
              >
                Login
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
`,
  );
}

const args = parseArgs(process.argv.slice(2));
const projectDir = path.resolve(args.projectDir);
const appDir = findAppDir(projectDir);
const layoutPath = path.join(appDir, "layout.tsx");

if (!fs.existsSync(layoutPath)) {
  throw new Error(`Missing layout file: ${layoutPath}`);
}

writeProvider(appDir, args);
writePage(appDir);
updateLayout(layoutPath);

console.log(`Auth0 React SDK files written in ${appDir}`);
