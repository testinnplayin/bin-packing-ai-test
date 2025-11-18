import dotenv from 'dotenv';
import app from './back/src/app';

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
