import { Router, Application } from 'express';

import { getClients, postClient } from '../controllers';
import { isValidRole, validateFields } from '../middlewares';
import { check } from 'express-validator';
import { validateEmailInDB } from '../validations';

const clientRoute = Router();

clientRoute.post('/clients',[
    isValidRole,
    check('email').custom( validateEmailInDB ),
    validateFields,
], postClient);
clientRoute.get('/clients', getClients);


const clientRoutes = (app: Application) => {
    app.use('/api', clientRoute);
};

export { clientRoutes };
