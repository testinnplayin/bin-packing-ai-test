import { BinPackingAlgorithmName, BinPackingResult } from '../domain';
import { calculateEfficiency } from './helpers/calculateEfficiency';

/**
 * First Fit Algorithm
 * Places each item in the first bin that can accommodate it
 */
export function firstFit(items: number[], binCapacity: number): BinPackingResult {
  const bins: number[][] = [];
  const binCount = bins.length;

  for (const item of items) {
    let isPlaced = false;

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

    // If not isPlaced, create new bin
    if (!isPlaced) {
      bins.push([item]);
    }
  }

  return {
    algorithm: BinPackingAlgorithmName.FIRST_FIT,
    bins,
    binCount,
    efficiency: calculateEfficiency(bins, binCapacity)
  };
}
