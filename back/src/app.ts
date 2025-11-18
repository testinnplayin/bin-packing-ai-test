import express, { NextFunction, Request, Response } from 'express';
import postPackingAlgorithmRouter from './routers/postPackingAlgorithm';

const app = express();

app.use(express.json());
app.use(postPackingAlgorithmRouter);

app.use(
  (err: Error, req: Request, res: Response, _next: NextFunction) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
      message: 'Something went wrong while processing your request.',
    });
  }
);

export default app;
