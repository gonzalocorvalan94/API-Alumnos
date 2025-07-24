import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';
import alumnosRoutes from './routes/alumnos.routes.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());


// Tus rutas van antes...
app.use('/alumnos', alumnosRoutes);

// Middleware de errores al final de todos los .use
app.use(errorHandler);
export default app;