import { Request, Response } from 'express';
import { ClientModel, UserModel } from '../models';
import bcrypt from 'bcryptjs';


export const postClient = async (req: Request, res: Response) => {
    const { names, surnames, email, phone, address, user, planId, trainerId } = req.body;
    const { password } = user;
    const { id: roleId } = req.body.role;

    try {

        //Encrypt Password
        const salt = bcrypt.genSaltSync();
        const hashPassword = bcrypt.hashSync(password, salt);

        const client = await ClientModel.create({
            names,
            surnames,
            email,
            phone,
            address,
            planId,
            trainerId,
            user: {
                email,
                password: hashPassword,
                roleId
            }
        }, {
            include: [{
                model: UserModel,
                as: 'user'
            }]
        });
        // sacar password del client.toJSON()

        const response = client.toJSON();
        delete response.user;

        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getClients = async (req: Request, res: Response) => {

    try {
        const clients = await ClientModel.findAll();

        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}