# Clerk + Convex setup

The dashboard account data is stored in Convex and scoped to the Clerk user ID. There is no localStorage account store.

## Local development

1. In Clerk Dashboard, enable the Convex integration for the selected Clerk application. Use the Clerk JWT template named `convex` (the Convex React Clerk provider requests this template).
2. Copy the Clerk Frontend API URL from Clerk's API keys page. It is the issuer domain, for example `https://your-instance.clerk.accounts.dev`.
3. In PowerShell, copy `.env.example` to `.env.local` and fill `VITE_CLERK_PUBLISHABLE_KEY` and `VITE_CONVEX_URL` with the real values.
4. Run `npx convex dev` from the project root and sign in to Convex when prompted. Select or create the development deployment. The CLI will sync `convex/schema.ts`, `convex/auth.config.ts`, and `convex/accounts.ts` and print the deployment URL; put its `*.convex.cloud` URL in `VITE_CONVEX_URL` and restart Vite.
5. In the Convex dashboard for that development deployment, add `CLERK_JWT_ISSUER_DOMAIN` with the exact Clerk Frontend API URL from step 2. Restart `npx convex dev` after saving.

After setup, sign into the app with Clerk. Test accounts are created in the Convex `accounts` table and remain attached to the signed-in Clerk identity across devices.

## Vercel and production

Set `VITE_CLERK_PUBLISHABLE_KEY` and `VITE_CONVEX_URL` in Vercel for the environments being deployed. Deploy the Convex backend with `npx convex deploy`, configure `CLERK_JWT_ISSUER_DOMAIN` on the production Convex deployment, and use its URL as the Vercel `VITE_CONVEX_URL`. Keep the Clerk development and production instances matched to their respective Convex deployments. Redeploy the Vite app after changing Vite variables.

There is no payment integration in this testing flow. The mutation creates a free active challenge account with its balance initialized to the starting balance. It does not allow clients to set balances or claim profits.
