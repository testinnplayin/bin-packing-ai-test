import { BinPackingAlgorithmName, BinPackingResult } from "../domain";
import { calculateEfficiency } from "./helpers/calculateEfficiency";

/**
 * Next Fit Algorithm
 * Maintains a pointer to the current bin and only tries to place items there.
 * If item doesn't fit, moves to next bin (creates if needed).
 */
export function nextFit(items: number[], binCapacity: number): BinPackingResult {
  const bins: number[][] = [];
  let binCount = bins.length;

  let currentBinIndex = -1;

  for (const item of items) {
    // Check if current bin can accommodate the item
    if (currentBinIndex >= 0) {
      const currentTotalWeight = bins[currentBinIndex].reduce((sumOfWeights, currentWeight) => sumOfWeights + currentWeight, 0);
      if (currentTotalWeight + item <= binCapacity) {
        bins[currentBinIndex].push(item);
        continue;
      }
    }

    // Item doesn't fit in current bin, create new bin
    bins.push([item]);
    currentBinIndex = binCount - 1;
  }

  return {
    algorithm: BinPackingAlgorithmName.NEXT_FIT,
    bins,
    binCount,
    efficiency: calculateEfficiency(bins, binCapacity)
  };
}
