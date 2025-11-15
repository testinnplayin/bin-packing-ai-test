import { firstFit } from '../../src/binPackingAlgorithms/firstFit';
import { BinPackingAlgorithmName } from '../../src/domain';

describe('firstFit', () => {
  it('should return correct bin-packing algorithm name', () => {
    const result = firstFit([1, 2, 3], 10);
    expect(result.algorithm).toBe(BinPackingAlgorithmName.FIRST_FIT);
  });

  it('should place items in the first bin that can accommodate them', () => {
    const items = [3, 2];
    const binCapacity = 5;
    // First item (3) goes in bin 0
    // Second item (2) can fit with 3 in bin 0 (3+2=5 <= 5)
    const expectedNumberOfBins = 1;
    const result = firstFit(items, binCapacity);

    const [firstBin] = result.bins;
    expect(result.binCount).toBe(expectedNumberOfBins);
    expect(firstBin).toEqual([3, 2]);
  });

  it('should pack all items into bins that fit', () => {
    const items = [4, 3, 2, 1];
    const binCapacity = 5;
    // Verify all items are packed
    // First bin has 4 and 1, second bin has 3 and 2
    const expectedNumberOfBins = 2;
    const expectedFirstBin = [4, 1];
    const expectedSecondBin = [3, 2];

    const result = firstFit(items, binCapacity);

    const [firstBin, secondBin] = result.bins;
    expect(result.binCount).toBe(expectedNumberOfBins);
    expect(firstBin).toEqual(expectedFirstBin);
    expect(secondBin).toEqual(expectedSecondBin);
  });

  it('should create a new bin when no existing bin can accommodate an item', () => {
    const items = [4, 4, 4];
    const binCapacity = 5;
    // Each item is too large to fit with others, so each needs its own bin
    const expectedNumberOfBins = 3;
    const expectedFirstBin = [4];
    const expectedSecondBin = [4];
    const expectedThirdBin = [4];

    const result = firstFit(items, binCapacity);
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

    const result = firstFit(items, binCapacity);

    expect(result.binCount).toBe(expectedNumberOfBins);
    expect(result.efficiency).toBe('0.00');
  });

  it('should handle empty items array', () => {
    // Empty items array should result in 0 bins and 0 efficiency
    const expectedNumberOfBins = 0;
    const expectedEfficiency = '0.00';

    const result = firstFit([], 10);

    expect(result.binCount).toBe(expectedNumberOfBins);
    expect(result.efficiency).toBe(expectedEfficiency);
  });

  it('should calculate efficiency correctly', () => {
    const items = [4, 4, 4];
    const binCapacity = 10;
    // We expect there to be 2 bins, the first should contain 2 items(4) and the second one should have 1 item (4)
    // The expectedEfficiency should be 60%
    const expectedNumberOfBins = 2;
    const expectedEfficiency = '60.00';

    const result = firstFit(items, binCapacity);

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

    const result = firstFit(items, binCapacity);

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
    const expectedNumberOfBins = 3;
    const expectedEfficiency = '66.67';

    const result = firstFit(items, binCapacity);

    // Items should be packed: [2, 2, 2] in bin 0 (6 > 5, wait no...)
    // Actually: 2+2=4 <= 5, so bin 0: [2, 2]
    // Then 2 cannot fit (4+2=6 > 5), so bin 1: [2]
    // Then 2 can fit in bin 1 (2+2=4 <= 5), so bin 1: [2, 2]
    // Then 2 cannot fit, so bin 2: [2]
    // Expected: [[2, 2], [2, 2], [2]]
    // Total used: 10, Total capacity: 15, Efficiency: (10/15)*100 = 66.67%
    expect(result.binCount).toBe(expectedNumberOfBins);
    expect(result.efficiency).toBe(expectedEfficiency);
  });

  it('should verify no bin exceeds capacity', () => {
    const items = [3, 4, 2, 5, 1];
    const binCapacity = 7;
    const expectedNumberOfBins = 3;
    const expectedEfficiency = '71.43';

    const result = firstFit(items, binCapacity);

    // Result: [[3, 4], [2, 5], [1]]
    // Total used: 15, Total capacity: 21, Efficiency: (15/21)*100 = 71.43%
    expect(result.binCount).toBe(expectedNumberOfBins);
    expect(result.efficiency).toBe(expectedEfficiency);
  });
});

