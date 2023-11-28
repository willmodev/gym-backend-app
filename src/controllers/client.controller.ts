import { Request, Response } from 'express';
import { ClientModel } from '../models';


export const postClient = async (req: Request, res: Response) => {

    const { names, surnames, email, phone, address, planId, trainerId } = req.body;

    
    try {
        
        const client = ClientModel.build({
            names,
            surnames,
            email,
            phone,
            address,
            planId,
            trainerId
        })
        
        console.log(client.toJSON());
        await client.save();
        res.status(201).json( client.toJSON() );
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getClients = async (req: Request, res: Response) => {

    try {
        const clients = await ClientModel.findAll();

        res.json( clients );
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}