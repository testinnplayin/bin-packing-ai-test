import { BinPackingAlgorithmName, BinPackingResult } from "../domain";
import { firstFit } from "./firstFit";

/**
 * First Fit Decreasing Algorithm
 * Sorts items in descending order, then applies First Fit
 */
export function firstFitDecreasing(items: number[], binCapacity: number): BinPackingResult {
  // Sort items in descending order
  const sortedItems = [...items].sort((a, b) => b - a);
  return {
    ...firstFit(sortedItems, binCapacity),
    algorithm: BinPackingAlgorithmName.FIRST_FIT_DECREASING
  };
}
