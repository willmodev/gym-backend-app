import express, { Application } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import fileUpload from 'express-fileupload';

import { clientRoutes, planRoutes, trainerRoutes, userRoutes, authRoutes } from '../routes/'
import db from '../db/connection';

import * as swaggerDocument from '../../src/swagger.json';


export class Server {

    private app: Application;
    private port: string;
    private serverUrl: string;


    constructor() {
        this.app = express();
        this.app.disable('x-powered-by'); // Hide X-Powered-By: Express
        this.port = process.env.PORT || '1234';
        this.serverUrl = process.env.SERVER_URL || 'localhost';



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

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors());


        // Modifica la URL del servidor en el documento Swagger
        swaggerDocument.servers[0].url = `http://${this.serverUrl}:${this.port}`;
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        // Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

    }

    routes() {
        clientRoutes(this.app);
        planRoutes(this.app);
        trainerRoutes(this.app);
        userRoutes(this.app);
        authRoutes(this.app);
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port http://localhost:${this.port}`);
        })
    }
}