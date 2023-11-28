import { Request, Response } from 'express';
import { TrainerModel } from '../models';


export const postTrainer= async (req: Request, res: Response) => {

    const { names, surnames, email, phone, address } = req.body;
    try {

        const client = await TrainerModel.create({
            names,
            surnames,
            email,
            phone,
            address
        })

        res.status(201).json( client.toJSON() );
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getTrainers = async (req: Request, res: Response) => {

    try {
        const trainer = await TrainerModel.findAll();

        res.json( trainer );
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}