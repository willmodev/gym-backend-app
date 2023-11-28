import express, { Application } from 'express';
import supertest from 'supertest';

export const testServer = (route: (app: Application) => void) => {
    const app = express();
    route(app);
    return supertest(app);
};