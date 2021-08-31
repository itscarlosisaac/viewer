import express from 'express';
import router from './routes/Router';
import cors from 'cors';
import { port } from './config'

const app = express();

app.use(express.json())
app.use(cors())

app.use('/api', router);
app.use('/api/bucket', express.static('./src/bucket'))

app.listen(port, () => {
  console.log(`App listening to port ${port}`);
});
