import { Request, Response, Router } from "express";
import { firstFit, firstFitDecreasing, nextFit } from "../binPackingAlgorithms";

interface PackRequest {
    items: number[];
    binCapacity: number;
}
  
interface PackResponse {
    firstFit: ReturnType<typeof firstFit>;
    nextFit: ReturnType<typeof nextFit>;
    firstFitDecreasing: ReturnType<typeof firstFitDecreasing>;
}

const postPackingAlgorithmRouter = Router();
  
  // API endpoint to run bin-packing algorithms
postPackingAlgorithmRouter.post('/api/pack', (req: Request<{}, PackResponse, PackRequest>, res: Response<PackResponse | { error: string }>) => {
    const { items, binCapacity } = req.body;

    if (!items || !Array.isArray(items) || !binCapacity) {
        return res.status(400).json({ error: 'Invalid input. Need items array and binCapacity.' });
    }

    try {
        const results: PackResponse = {
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