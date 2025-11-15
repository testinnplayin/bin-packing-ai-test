import { calculateEfficiency } from '../../../src/binPackingAlgorithms/helpers/calculateEfficiency';

describe('calculateEfficiency', () => {
  it('should calculate efficiency correctly for filled bins', () => {
    const bins = [[5], [5], [5]];
    const binCapacity = 5;
    const result = calculateEfficiency(bins, binCapacity);

    // Total used: 15, Total capacity: 15, Efficiency: 100%
    expect(result).toBe('100.00');
  });

  it('should calculate efficiency correctly for partially filled bins', () => {
    const bins = [[4, 1], [3]];
    const binCapacity = 5;
    const result = calculateEfficiency(bins, binCapacity);

    // Total used: 8, Total capacity: 10, Efficiency: 80%
    expect(result).toBe('80.00');
  });

  it('should return 0.00 for empty bins', () => {
    const bins: number[][] = [];
    const binCapacity = 5;
    const result = calculateEfficiency(bins, binCapacity);

    expect(result).toBe('0.00');
  });
});

