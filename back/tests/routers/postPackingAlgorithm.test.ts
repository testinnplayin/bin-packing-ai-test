import request from 'supertest';
import app from '../../src/app';
import * as binPackingAlgorithms from '../../src/binPackingAlgorithms';

jest.mock('../../src/binPackingAlgorithms');

const mockedBinPackingAlgorithms = binPackingAlgorithms as jest.Mocked<typeof binPackingAlgorithms>;
const { firstFit, nextFit, firstFitDecreasing } = mockedBinPackingAlgorithms;

describe('POST /api/compare-algorithms router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a 400 error for invalid input', async () => {
    const response = await request(app)
      .post('/api/compare-algorithms')
      .send({ items: 'not-an-array', binCapacity: 10 });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: 'Invalid input. Need items array and binCapacity.',
    });
    expect(firstFit).not.toHaveBeenCalled();
    expect(nextFit).not.toHaveBeenCalled();
    expect(firstFitDecreasing).not.toHaveBeenCalled();
  });

  it('should return a 500 error when unexpected error', async () => {
    const errorMessage = 'Test algorithm failure';
    firstFit.mockImplementation(() => {
      throw new Error(errorMessage);
    });

    const response = await request(app)
      .post('/api/compare-algorithms')
      .send({ items: [1, 2, 3], binCapacity: 10 });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: errorMessage });
  });

  it('should return 200 with algorithm results on success', async () => {
    const items = [1, 2, 3];
    const binCapacity = 10;

    const firstFitResult = {
      algorithm: 'First Fit',
      bins: [[1, 2, 3]],
      binCount: 1,
      efficiency: '100.00',
    };

    const nextFitResult = {
      algorithm: 'Next Fit',
      bins: [[1], [2, 3]],
      binCount: 2,
      efficiency: '80.00',
    };

    const firstFitDecreasingResult = {
      algorithm: 'First Fit Decreasing',
      bins: [[3, 2, 1]],
      binCount: 1,
      efficiency: '100.00',
    };

    firstFit.mockReturnValue(firstFitResult);
    nextFit.mockReturnValue(nextFitResult);
    firstFitDecreasing.mockReturnValue(firstFitDecreasingResult);

    const response = await request(app)
      .post('/api/compare-algorithms')
      .send({ items, binCapacity });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      firstFit: firstFitResult,
      nextFit: nextFitResult,
      firstFitDecreasing: firstFitDecreasingResult,
    });
    expect(firstFit).toHaveBeenCalledWith([...items], binCapacity);
    expect(nextFit).toHaveBeenCalledWith([...items], binCapacity);
    expect(firstFitDecreasing).toHaveBeenCalledWith([...items], binCapacity);
  });
});
