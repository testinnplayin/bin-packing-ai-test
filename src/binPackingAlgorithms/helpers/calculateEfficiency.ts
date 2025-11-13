/**
 * Calculate efficiency (average bin utilization)
 */
export function calculateEfficiency(bins: number[][], binCapacity: number): string {
  if (bins.length === 0) return '0.00';

  const totalUsed = bins.reduce((sum, bin) => {
    return sum + bin.reduce((binSum, item) => binSum + item, 0);
  }, 0);

  const totalCapacity = bins.length * binCapacity;
  return ((totalUsed / totalCapacity) * 100).toFixed(2);
}
