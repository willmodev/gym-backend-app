import express, { Application } from 'express';
import cors from 'cors';

import { clientRoutes, planRoutes, trainerRoutes } from '../routes/'
import db from '../db/connection';

export class Server {

    private app: Application;
    private port: string;


    constructor() {
        this.app = express();
        this.app.disable('x-powered-by'); // Hide X-Powered-By: Express
        this.port = process.env.PORT || '1234';



        this.dbConnection();

        this.middlewares();

        this.routes();
    }


    async dbConnection() {
        try {
            await db.sync({ force: false });
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }



    middlewares() {

        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.urlencoded({ extended: true }));

    }

    routes() {
        clientRoutes(this.app);
        planRoutes(this.app);
        trainerRoutes(this.app);
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port http://localhost:${this.port}`);
        })
    }
}