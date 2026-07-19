"use client";

import { useState, useSyncExternalStore } from "react";
import type { BudgetRange } from "@/data/site";
import {
  BUDGET_STEP,
  MAX_BUDGET,
  MIN_BUDGET,
  RATE_PER_1K,
  budgetBucket,
  formatBudget,
  formatViews,
  viewsForBudget,
} from "@/data/pricing";

// Whatever budget someone lands on in the hero is the budget they came to talk
// about, so the lead form starts there instead of asking again. Kept in a tiny
// store rather than lifted state because the two live in different sections.
let chosenBudget: number | null = null;
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function setChosenBudget(budget: number) {
  chosenBudget = budget;
  listeners.forEach((notify) => notify());
}

/** The bucket the hero slider was left on, or "" if it was never touched. */
export function useChosenBudgetRange(): BudgetRange | "" {
  return useSyncExternalStore(
    subscribe,
    () => (chosenBudget === null ? "" : budgetBucket(chosenBudget)),
    () => "",
  );
}

export function BudgetSlider() {
  const [budget, setBudget] = useState(MIN_BUDGET);
  const views = viewsForBudget(budget);
  const progress = ((budget - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100;

  function update(value: number) {
    setBudget(value);
    setChosenBudget(value);
  }

  return (
    <div className="hero-panel" aria-label="Campaign rate calculator">
      <span className="panel-label">Campaign / rate</span>

      <div className="budget-head">
        <label htmlFor="budget-slider">Your budget</label>
        <output htmlFor="budget-slider">{formatBudget(budget)}</output>
      </div>

      <input
        className="budget-range"
        id="budget-slider"
        type="range"
        min={MIN_BUDGET}
        max={MAX_BUDGET}
        step={BUDGET_STEP}
        value={budget}
        onChange={(event) => update(Number(event.target.value))}
        style={{ "--progress": `${progress}%` } as React.CSSProperties}
        aria-valuetext={`${formatBudget(budget)}, ${formatViews(views)} verified views`}
      />

      <div className="budget-scale" aria-hidden="true">
        <span>{formatBudget(MIN_BUDGET)} min</span>
        <span>{formatBudget(MAX_BUDGET)}</span>
      </div>

      {/* Derived, never typed, so the figure cannot drift from the rate. */}
      <strong aria-live="polite">{formatViews(views)}</strong>
      <span>verified views</span>

      <div className="panel-rule" />
      <p>
        ${RATE_PER_1K} per 1,000 &middot; billed on views actually delivered.
      </p>
    </div>
  );
}
