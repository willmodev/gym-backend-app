import { Router, Application } from 'express';
import { getTrainers, postTrainer } from '../controllers';


const trainerRoute = Router();

trainerRoute.post('/trainers', postTrainer);
trainerRoute.get('/trainers', getTrainers);


const trainerRoutes = (app: Application) => {
    app.use('/api', trainerRoute);
};

export { trainerRoutes };
