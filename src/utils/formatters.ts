/**
 * Formats an integer or decimal count into Brazilian locale string (e.g. 45.250)
 */
export function formatQuantity(value: number): string {
  if (isNaN(value) || value === null || value === undefined) return '0';
  return new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

/**
 * Formats a currency value with US$ prefix and Brazilian decimal separator (e.g. US$ 537,70)
 */
export function formatCurrency(value: number, decimals: number = 2): string {
  if (isNaN(value) || value === null || value === undefined) return 'US$ 0,00';
  
  const formatted = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

  return `US$ ${formatted}`;
}

/**
 * Formats a unit tariff, keeping up to 4 decimal places if needed (e.g. US$ 0,001, US$ 0,0068, US$ 0,0625)
 */
export function formatTariff(value: number): string {
  if (isNaN(value) || value === null || value === undefined) return 'US$ 0,0000';

  const formatted = new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 4,
  }).format(value);

  return `US$ ${formatted}`;
}

/**
 * Formats a percentage rate (e.g. +10%, -10%, 0%)
 */
export function formatRate(value: number): string {
  if (isNaN(value) || value === null || value === undefined) return '0%';
  const sign = value > 0 ? '+' : '';
  const formatted = new Intl.NumberFormat('pt-BR', {
    maximumFractionDigits: 1,
  }).format(value);
  return `${sign}${formatted}%`;
}

/**
 * Cleans and parses a numeric string into a safe floating point number
 */
export function parseInputNumber(raw: string | number): number {
  if (typeof raw === 'number') return isNaN(raw) ? 0 : raw;
  if (!raw || typeof raw !== 'string') return 0;
  
  // Replace Brazilian formatting if pasted (e.g., "45.250,50" -> "45250.50" or "45,25" -> "45.25")
  const sanitized = raw
    .trim()
    .replace(/[^\d.,-]/g, '')
    .replace(/\.(?=\d{3}(?:\.|$|,))/g, '') // remove thousand dots
    .replace(',', '.'); // convert comma to dot

  const num = parseFloat(sanitized);
  return isNaN(num) ? 0 : num;
}
