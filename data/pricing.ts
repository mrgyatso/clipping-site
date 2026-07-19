import type { BudgetRange } from "./site";

// The single source of truth for the offer. The hero slider, the metric cards,
// and the lead form all derive from these, so changing the rate changes the
// whole site rather than leaving one number stale.
export const RATE_PER_1K = 4;
export const MIN_BUDGET = 1000;
export const MAX_BUDGET = 10000;
export const BUDGET_STEP = 250;

export function viewsForBudget(budget: number) {
  return (budget / RATE_PER_1K) * 1000;
}

// 250000 -> "250K", 2500000 -> "2.5M". Truncates rather than rounds so a figure
// on the page never promises more views than the rate actually buys.
export function formatViews(views: number) {
  if (views >= 1_000_000) {
    const millions = Math.floor((views / 1_000_000) * 10) / 10;
    return `${millions.toFixed(1).replace(/\.0$/, "")}M`;
  }
  return `${Math.floor(views / 1000)}K`;
}

export function formatBudget(budget: number) {
  return `$${budget.toLocaleString("en-US")}`;
}

// The slider starts at the minimum, so it can never produce "under_1000".
export function budgetBucket(budget: number): BudgetRange {
  if (budget < 1000) return "under_1000";
  if (budget < 2500) return "1000_2499";
  if (budget < 5000) return "2500_4999";
  return "5000_plus";
}
