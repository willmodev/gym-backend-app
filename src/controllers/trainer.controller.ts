import { Request, Response } from 'express';
import { TrainerModel, UserModel } from '../models';
import bcrypt from 'bcryptjs';


export const postTrainer= async (req: Request, res: Response) => {

    const { names, surnames, email, phone, address, user } = req.body;
    const { password } = user;
    const { id: roleId } = req.body.role;

    try {

        //Encrypt Password
        const salt = bcrypt.genSaltSync();
        const hashPassword = bcrypt.hashSync(password, salt);

        const trainer = await TrainerModel.create({
            names,
            surnames,
            email,
            phone,
            address,
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
        })

        // sacar password del client.toJSON()

        const response = trainer.toJSON();
        delete response.user;

        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        
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