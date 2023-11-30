import { Router, Application } from 'express';
import { getTrainers, postTrainer } from '../controllers';
import { isValidRole, validateFields } from '../middlewares';
import { validateEmailInDB } from '../validations';
import { check } from 'express-validator';


const trainerRoute = Router();

trainerRoute.post('/trainers',[
    isValidRole,
    check('email').custom( validateEmailInDB ),
    validateFields
], postTrainer);
trainerRoute.get('/trainers', getTrainers);


const trainerRoutes = (app: Application) => {
    app.use('/api', trainerRoute);
};

export { trainerRoutes };
