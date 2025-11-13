import { BinPackingResult } from '../domain';
import { calculateEfficiency } from './helpers/calculateEfficiency';

/**
 * First Fit Algorithm
 * Places each item in the first bin that can accommodate it
 */
export function firstFit(items: number[], binCapacity: number): BinPackingResult {
  const bins: number[][] = [];

  for (const item of items) {
    let isPlaced = false;

    // Try to place in existing bins
    for (let i = 0; i < bins.length; i++) {
      const currentWeight = bins[i].reduce((sum, currentNum) => sum + currentNum, 0);
      if (currentWeight + item <= binCapacity) {
        bins[i].push(item);
        isPlaced = true;
        break;
      }
    }

    // If not isPlaced, create new bin
    if (!isPlaced) {
      bins.push([item]);
    }
  }

  return {
    algorithm: 'First Fit',
    bins: bins,
    binCount: bins.length,
    efficiency: calculateEfficiency(bins, binCapacity)
  };
}
