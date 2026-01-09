import { CURRENCIES } from './currencyConstants';

export const validatePurchase = (inputPrice, inputCurrency, finances) => {
  // CRITICAL: Destructure 'balance' to match your dashboard's savings pool
  const { income, expenses, balance, currentEMIs } = finances;
  
  // 1. Normalize input price to INR Base for math
  const rate = CURRENCIES[inputCurrency]?.rate || 1;
  const priceInINR = Number(inputPrice) * rate;

  // 2. Normalize wealth metrics
  const liquidBalanceINR = Number(balance);
  const monthlyDisposable = Number(income) - Math.abs(Number(expenses)) - Number(currentEMIs);
  
  const safeLimit = liquidBalanceINR * 0.7; // 70% threshold
  const maxAffordable = liquidBalanceINR + (monthlyDisposable * 6);

  let status = "UNAFFORDABLE";
  // The budget is the target price in INR, capped by safe limits for suggestions
  let budgetINR = Math.min(priceInINR, safeLimit);

  if (priceInINR <= safeLimit) {
    status = "SAFE TO BUY";
  } else if (priceInINR <= liquidBalanceINR) {
    status = "RISKY";
  } else if (priceInINR <= maxAffordable) {
    status = "EMI RECOMMENDED";
  }

  return { status, budgetINR, actualPriceInINR: priceInINR };
};

export const getSimilarityScore = (target, alt, budgetINR) => {
  let score = 0;
  const altPriceINR = alt.price * (CURRENCIES[alt.currency]?.rate || 1);

  if (alt.category === target.category) {
    if (alt.tier === target.tier) score += 50;
    if (altPriceINR <= budgetINR) score += 50;
  }
  return score;
};