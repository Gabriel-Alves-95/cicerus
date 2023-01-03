import express from 'express';
import { Router, Request, Response } from 'express';
import cors from 'cors';

// Routes
import auth from './routes/auth';
import translation from './routes/translation';

// Database
import { sequelizeDb, mongooseDb } from './db';

const app = express();
const route = Router();

app.use( cors() );
app.use( express.json() );

route.get('/', (req: Request, res: Response) => {
    res.json({message: 'App is running...'});
});

app.use( route );
app.use( "/autenticacao", auth );
app.use( "/traducoes", translation );
  
sequelizeDb.sync();

app.listen(3000, () => 'Server running in port 3000');