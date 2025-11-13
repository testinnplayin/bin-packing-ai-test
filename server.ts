import express from 'express';
import postPackingAlgorithmRouter from './src/routers/postPackingAlgorithm';
const app = express();
const PORT = 3000;

// Serve static files from public directory
app.use(express.static('public'));
app.use(express.json());

app.use(postPackingAlgorithmRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
