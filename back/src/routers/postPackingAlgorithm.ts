import { Request, Response, Router } from "express";
import { firstFit, firstFitDecreasing, nextFit } from "../binPackingAlgorithms";
import { BinPackingResult } from '../domain';

interface BinPackingRequest {
  items: number[];
  binCapacity: number;
}

interface BinPackingResponse {
  firstFit: BinPackingResult;
  nextFit: BinPackingResult
  firstFitDecreasing: BinPackingResult;
}

const postPackingAlgorithmRouter = Router();

// API endpoint to run bin-packing algorithms
postPackingAlgorithmRouter.post('/api/compare-algorithms', (req: Request<{}, BinPackingResponse, BinPackingRequest>, res: Response<BinPackingResponse | { error: string }>) => {
  const { items, binCapacity } = req.body;

  if (!items || !Array.isArray(items) || !binCapacity) {
    return res.status(400).json({ error: 'Invalid input. Need items array and binCapacity.' });
  }

  try {
    const results: BinPackingResponse = {
      firstFit: firstFit([...items], binCapacity),
      nextFit: nextFit([...items], binCapacity),
      firstFitDecreasing: firstFitDecreasing([...items], binCapacity)
    };
    res.json(results);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: errorMessage });
  }
});

export default postPackingAlgorithmRouter;