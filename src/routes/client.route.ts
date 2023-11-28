import { Router, Application } from 'express';

import { getClients, postClient } from '../controllers';

const clientRoute = Router();

clientRoute.post('/clients', postClient);
clientRoute.get('/clients', getClients);


const clientRoutes = (app: Application) => {
    app.use('/api', clientRoute);
};

export { clientRoutes };
