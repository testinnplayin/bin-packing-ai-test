import { firstFitDecreasing } from '../../src/binPackingAlgorithms/firstFitDecreasing';
import { BinPackingAlgorithmName } from '../../src/domain';

describe('firstFitDecreasing', () => {
  it('should return correct bin-packing algorithm name', () => {
    const result = firstFitDecreasing([1, 2, 3], 10);
    expect(result.algorithm).toBe(BinPackingAlgorithmName.FIRST_FIT_DECREASING);
  });

  it('should return an empty array if an empty array of items is passed to the firstFitDecreasing function', () => {
    // Empty items array should result in 0 bins and 0 efficiency
    const expectedNumberOfBins = 0;
    const expectedEfficiency = '0.00';

    const result = firstFitDecreasing([], 10);

    expect(result.binCount).toBe(expectedNumberOfBins);
    expect(result.efficiency).toBe(expectedEfficiency);
    expect(result.bins).toEqual([]);
  });

  it('should pack items correctly when sorted in descending order', () => {
    const items = [8, 8, 2, 9, 6, 9, 5, 4, 6, 9, 7];
    const binCapacity = 15;
    // Items are sorted in descending order: [9, 9, 9, 8, 8, 7, 6, 6, 5, 4, 2]
    // Expected packing: [[9, 6], [9, 6], [9, 5], [8, 7], [8, 4, 2]]
    const expectedNumberOfBins = 5;
    const expectedFirstBin = [9, 6];
    const expectedSecondBin = [9, 6];
    const expectedThirdBin = [9, 5];
    const expectedFourthBin = [8, 7];
    const expectedFifthBin = [8, 4, 2];
    // Sometimes the answer is not an optimized packing result like in this case so we expect less than 100% efficiency
    const expectedEfficiency = '97.33';

    const result = firstFitDecreasing(items, binCapacity);

    const [firstBin, secondBin, thirdBin, fourthBin, fifthBin] = result.bins;
    expect(result.binCount).toBe(expectedNumberOfBins);
    expect(firstBin).toEqual(expectedFirstBin);
    expect(secondBin).toEqual(expectedSecondBin);
    expect(thirdBin).toEqual(expectedThirdBin);
    expect(fourthBin).toEqual(expectedFourthBin);
    expect(fifthBin).toEqual(expectedFifthBin);
    expect(result.efficiency).toBe(expectedEfficiency);
  });
});

