import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';


export const validateFields = (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);

    const errorResult = result.array().map((error: any) => {
        return {
            field: error.path,
            message: error.msg
        }
    })

    if (!result.isEmpty()) return res.status(400).json(errorResult);

    next();
}