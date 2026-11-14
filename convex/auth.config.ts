import type { AuthConfig } from "convex/server";
import { env } from "./_generated/server";

export default {
  providers: [
    {
      domain: (env as Record<string, string | undefined>).CLERK_JWT_ISSUER_DOMAIN!,
      applicationID: "convex",
    },
  ],
} satisfies AuthConfig;
