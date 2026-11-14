import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  accounts: defineTable({
    ownerId: v.string(),
    size: v.number(),
    oddsTarget: v.union(v.literal(3.2), v.literal(6.2)),
    startingBalance: v.number(),
    balance: v.number(),
    status: v.literal("active"),
    createdAt: v.number(),
  }).index("by_owner", ["ownerId"]),
  accountSummaries: defineTable({
    ownerId: v.string(),
    activeCount: v.number(),
    positiveProfit: v.number(),
  }).index("by_owner", ["ownerId"]),
});
