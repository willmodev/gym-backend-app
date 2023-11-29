import { NextFunction, Request, Response } from 'express';

import { ensureAuth } from '../helpers';


export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers['authorization'];

    try {
        const user = await ensureAuth(authHeader);
        req.body.user = user;
        next();

    } catch (msg) {
        console.log(msg);
        return res.status(401).send(msg)
    }

}