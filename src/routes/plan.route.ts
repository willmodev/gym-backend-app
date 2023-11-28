import { Application, Router } from 'express';
import { getPlans, postPlan } from '../controllers';



const planRoute = Router();

planRoute.post('/plans', postPlan);
planRoute.get('/plans', getPlans);


const planRoutes = ( app: Application ) => {
    app.use('/api', planRoute);
}

export { planRoutes };