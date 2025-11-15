import { BinPackingAlgorithmName, BinPackingResult } from '../domain';
import { calculateEfficiency } from './helpers/calculateEfficiency';

/**
 * First Fit Algorithm
 * Places each item in the first bin that can accommodate it
 */
export function firstFit(items: number[], binCapacity: number): BinPackingResult {
  const bins: number[][] = [];
  let binCount = 0;

  for (const item of items) {
    let isPlaced = false;
    binCount = bins.length;

    // Try to place in existing bins
    for (let i = 0; i < binCount; i++) {
      const bin = bins[i];
      const currentTotalWeight = bin.reduce((sumOfWeights, currentWeight) => sumOfWeights + currentWeight, 0);
      if (currentTotalWeight + item <= binCapacity) {
        bin.push(item);
        isPlaced = true;
        break;
      }
    }

    // If not isPlaced, create new bin only if item fits
    if (!isPlaced && item <= binCapacity) {
      bins.push([item]);
    }
  }

  return {
    algorithm: BinPackingAlgorithmName.FIRST_FIT,
    bins,
    binCount: bins.length,
    efficiency: calculateEfficiency(bins, binCapacity)
  };
}
