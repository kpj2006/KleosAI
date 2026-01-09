/**
 * Global Multi-Currency Constants
 */
export const CURRENCIES = {
  INR: { symbol: "₹", rate: 1, name: "Rupees", locale: "en-IN" },
  USD: { symbol: "$", rate: 83.35, name: "Dollars", locale: "en-US" },
  GBP: { symbol: "£", rate: 105.92, name: "Pounds", locale: "en-GB" },
  EUR: { symbol: "€", rate: 90.45, name: "Euros", locale: "de-DE" },
  CNY: { symbol: "¥", rate: 11.65, name: "Yuan", locale: "zh-CN" }
};

export const formatGlobal = (amountInINR, code = "INR") => {
  const currency = CURRENCIES[code] || CURRENCIES.INR;
  const convertedAmount = amountInINR / currency.rate;
  
  // Use Intl.NumberFormat to automatically place the correct symbol
  return new Intl.NumberFormat(currency.locale, {
    style: 'currency',
    currency: code,
    maximumFractionDigits: 0
  }).format(convertedAmount);
};