import { mutation, query } from "./_generated/server";
import { paginationOptsValidator, paginationResultValidator } from "convex/server";
import { v } from "convex/values";

const dashboardAccount = v.object({
  id: v.id("accounts"),
  size: v.number(),
  oddsTarget: v.union(v.literal(3.2), v.literal(6.2)),
  startingBalance: v.number(),
  balance: v.number(),
  status: v.literal("active"),
  createdAt: v.number(),
});

const accountSize = v.union(
  v.literal(100000),
  v.literal(200000),
  v.literal(300000),
  v.literal(400000),
  v.literal(500000),
);

async function requireIdentity(ctx: { auth: { getUserIdentity: () => Promise<{ subject: string } | null> } }) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("You must be signed in to access your accounts.");
  return identity;
}

export const getDashboardSummary = query({
  args: {},
  returns: v.object({ activeCount: v.number(), withdrawableProfit: v.number() }),
  handler: async (ctx) => {
    const identity = await requireIdentity(ctx);
    const summary = await ctx.db
      .query("accountSummaries")
      .withIndex("by_owner", (q) => q.eq("ownerId", identity.subject))
      .unique();

    return {
      activeCount: summary?.activeCount ?? 0,
      withdrawableProfit: Math.floor((summary?.positiveProfit ?? 0) * 0.6),
    };
  },
});

export const listMine = query({
  args: { paginationOpts: paginationOptsValidator },
  returns: paginationResultValidator(dashboardAccount),
  handler: async (ctx, args) => {
    const identity = await requireIdentity(ctx);
    const page = await ctx.db
      .query("accounts")
      .withIndex("by_owner", (q) => q.eq("ownerId", identity.subject))
      .order("desc")
      .paginate(args.paginationOpts);

    return {
      ...page,
      page: page.page.map((account) => ({
          id: account._id,
          size: account.size,
          oddsTarget: account.oddsTarget,
          startingBalance: account.startingBalance,
          balance: account.balance,
          status: account.status,
          createdAt: account.createdAt,
        })),
    };
  },
});

export const createFreeTestAccount = mutation({
  args: {
    size: accountSize,
    oddsTarget: v.union(v.literal(3.2), v.literal(6.2)),
  },
  returns: v.id("accounts"),
  handler: async (ctx, args) => {
    const identity = await requireIdentity(ctx);
    const now = Date.now();
    const accountId = await ctx.db.insert("accounts", {
      ownerId: identity.subject,
      size: args.size,
      oddsTarget: args.oddsTarget,
      startingBalance: args.size,
      balance: args.size,
      status: "active",
      createdAt: now,
    });
    const summary = await ctx.db
      .query("accountSummaries")
      .withIndex("by_owner", (q) => q.eq("ownerId", identity.subject))
      .unique();
    if (summary) {
      await ctx.db.patch(summary._id, { activeCount: summary.activeCount + 1 });
    } else {
      await ctx.db.insert("accountSummaries", {
        ownerId: identity.subject,
        activeCount: 1,
        positiveProfit: 0,
      });
    }
    return accountId;
  },
});
