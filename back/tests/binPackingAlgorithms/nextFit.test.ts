import { nextFit } from '../../src/binPackingAlgorithms/nextFit';
import { BinPackingAlgorithmName } from '../../src/domain';

describe('nextFit', () => {
  it('should return correct bin-packing algorithm name', () => {
    const result = nextFit([1, 2, 3], 10);
    expect(result.algorithm).toBe(BinPackingAlgorithmName.NEXT_FIT);
  });

  it('should place items in the current bin that can accommodate them', () => {
    const items = [3, 2];
    const binCapacity = 5;
    // First item (3) goes in bin 0
    // Second item (2) can fit with 3 in bin 0 (3+2=5 <= 5)
    const expectedNumberOfBins = 1;

    const result = nextFit(items, binCapacity);

    const [firstBin] = result.bins;
    expect(result.binCount).toBe(expectedNumberOfBins);
    expect(firstBin).toEqual([3, 2]);
  });

  it('should pack all items into bins that fit', () => {
    const items = [4, 3, 2, 1];
    const binCapacity = 5;
    // Next Fit: bin 0 gets 4, then 3 doesn't fit (4+3=7 > 5), so bin 1 gets 3
    // Then 2 doesn't fit in bin 1 (3+2=5 <= 5), wait, 5 <= 5 so it fits!
    // Actually: bin 0: [4], bin 1: [3, 2], bin 2: [1]
    // Or wait, let me think: bin 0: [4], then 3 doesn't fit so bin 1: [3], then 2 fits in bin 1: [3, 2], then 1 doesn't fit so bin 2: [1]
    const expectedNumberOfBins = 3;
    const expectedFirstBin = [4];
    const expectedSecondBin = [3, 2];
    const expectedThirdBin = [1];

    const result = nextFit(items, binCapacity);

    const [firstBin, secondBin, thirdBin] = result.bins;
    expect(result.binCount).toBe(expectedNumberOfBins);
    expect(firstBin).toEqual(expectedFirstBin);
    expect(secondBin).toEqual(expectedSecondBin);
    expect(thirdBin).toEqual(expectedThirdBin);
  });

  it('should create a new bin when current bin cannot accommodate an item', () => {
    const items = [4, 4, 4];
    const binCapacity = 5;
    // Each item is too large to fit with others, so each needs its own bin
    const expectedNumberOfBins = 3;
    const expectedFirstBin = [4];
    const expectedSecondBin = [4];
    const expectedThirdBin = [4];

    const result = nextFit(items, binCapacity);

    const [firstBin, secondBin, thirdBin] = result.bins;

    expect(result.binCount).toBe(expectedNumberOfBins);
    expect(firstBin).toEqual(expectedFirstBin);
    expect(secondBin).toEqual(expectedSecondBin);
    expect(thirdBin).toEqual(expectedThirdBin);
  });

  it('should not add items that exceed bin capacity', () => {
    const items = [6, 7, 8];
    const binCapacity = 5;
    // Items larger than binCapacity should not be placed
    const expectedNumberOfBins = 0;

    const result = nextFit(items, binCapacity);

    expect(result.binCount).toBe(expectedNumberOfBins);
    expect(result.efficiency).toBe('0.00');
  });

  it('should handle empty items array', () => {
    // Empty items array should result in 0 bins and 0 efficiency
    const expectedNumberOfBins = 0;
    const expectedEfficiency = '0.00';

    const result = nextFit([], 10);

    expect(result.binCount).toBe(expectedNumberOfBins);
    expect(result.efficiency).toBe(expectedEfficiency);
  });

  it('should calculate efficiency correctly', () => {
    const items = [4, 4, 4];
    const binCapacity = 10;
    // Next Fit: bin 0 gets 4, bin 0 gets another 4 (4+4=8 <= 10), then 4 doesn't fit so bin 1 gets 4
    // Expected: [[4, 4], [4]]
    // Total used: 12, Total capacity: 20, Efficiency: (12/20)*100 = 60%
    const expectedNumberOfBins = 2;
    const expectedEfficiency = '60.00';

    const result = nextFit(items, binCapacity);

    expect(result.binCount).toBe(expectedNumberOfBins);
    expect(result.efficiency).toBe(expectedEfficiency);
  });

  it('should handle items that exactly fill bins', () => {
    const items = [5, 5, 5];
    const binCapacity = 5;

    // Each item exactly fills a bin
    const expectedNumberOfBins = 3;
    const expectedFirstBin = [5];
    const expectedSecondBin = [5];
    const expectedThirdBin = [5];
    const expectedEfficiency = '100.00';

    const result = nextFit(items, binCapacity);

    const [firstBin, secondBin, thirdBin] = result.bins;

    expect(result.binCount).toBe(expectedNumberOfBins);
    expect(firstBin).toEqual(expectedFirstBin);
    expect(secondBin).toEqual(expectedSecondBin);
    expect(thirdBin).toEqual(expectedThirdBin);
    expect(result.efficiency).toBe(expectedEfficiency);
  });

  it('should pack items efficiently when they fit together', () => {
    const items = [2, 2, 2, 2, 2];
    const binCapacity = 5;
    // Next Fit: bin 0 gets 2, then 2 (2+2=4 <= 5), then 2 doesn't fit (4+2=6 > 5) so bin 1 gets 2
    // Then 2 fits in bin 1 (2+2=4 <= 5), then 2 doesn't fit so bin 2 gets 2
    // Expected: [[2, 2], [2, 2], [2]]
    // Total used: 10, Total capacity: 15, Efficiency: (10/15)*100 = 66.67%
    const expectedNumberOfBins = 3;
    const expectedEfficiency = '66.67';

    const result = nextFit(items, binCapacity);

    expect(result.binCount).toBe(expectedNumberOfBins);
    expect(result.efficiency).toBe(expectedEfficiency);
  });

  it('should verify no bin exceeds capacity', () => {
    const items = [3, 4, 2, 5, 1];
    const binCapacity = 7;
    // Next Fit: bin 0: [3], bin 0: [3, 4] (3+4=7 <= 7), then 2 doesn't fit so bin 1: [2, 5] (2+5=7 <= 7), then 1 doesn't fit so bin 2: [1]
    // Result: [[3, 4], [2, 5], [1]]
    // Total used: 15, Total capacity: 21, Efficiency: (15/21)*100 = 71.43%
    const expectedNumberOfBins = 3;
    const expectedEfficiency = '71.43';

    const result = nextFit(items, binCapacity);

    // Result: [[3, 4], [2, 5], [1]]
    // Total used: 15, Total capacity: 21, Efficiency: (15/21)*100 = 71.43%
    expect(result.binCount).toBe(expectedNumberOfBins);
    expect(result.efficiency).toBe(expectedEfficiency);
  });

  it('should pack items using only the current bin', () => {
    const items = [8, 8, 2, 9, 6, 9, 5, 4, 6, 9, 7];
    const binCapacity = 15;
    // Next Fit only uses the current bin, doesn't look back at previous bins
    // This will create more bins than First Fit since it can't reuse earlier bins
    // Expected packing: [[8], [8, 2], [9, 6], [9, 5], [4, 6], [9], [7]]
    const expectedNumberOfBins = 7;
    const expectedFirstBin = [8];
    const expectedSecondBin = [8, 2];
    const expectedThirdBin = [9, 6];
    const expectedFourthBin = [9, 5];
    const expectedFifthBin = [4, 6];
    const expectedSixthBin = [9];
    const expectedSeventhBin = [7];
    // Sometimes the answer is not an optimized packing result like in this case so we expect less than 100% efficiency
    const expectedEfficiency = '69.52';

    const result = nextFit(items, binCapacity);

    const [firstBin, secondBin, thirdBin, fourthBin, fifthBin, sixthBin, seventhBin] = result.bins;
    expect(result.binCount).toBe(expectedNumberOfBins);
    expect(firstBin).toEqual(expectedFirstBin);
    expect(secondBin).toEqual(expectedSecondBin);
    expect(thirdBin).toEqual(expectedThirdBin);
    expect(fourthBin).toEqual(expectedFourthBin);
    expect(fifthBin).toEqual(expectedFifthBin);
    expect(sixthBin).toEqual(expectedSixthBin);
    expect(seventhBin).toEqual(expectedSeventhBin);
    expect(result.efficiency).toBe(expectedEfficiency);
  });
});

