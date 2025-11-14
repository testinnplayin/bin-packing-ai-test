import express, { NextFunction, Request, Response } from 'express';
import postPackingAlgorithmRouter from './src/routers/postPackingAlgorithm';
const app = express();
const PORT = 3000;

// Serve static files from public directory
app.use(express.static('public'));
app.use(express.json());

app.use(postPackingAlgorithmRouter);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    message: 'Something went wrong while processing your request.'
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
