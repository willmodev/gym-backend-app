import dotenv from 'dotenv';
dotenv.config();

import { Server } from './models';


const server = new Server();


server.listen();