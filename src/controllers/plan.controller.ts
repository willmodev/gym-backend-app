import { Request, Response } from 'express';
import { PlanModel } from '../models';



export const postPlan = async (req: Request, res: Response) => {

    const { name, description, durationInDays, price, status } = req.body;

    try {

        const plan = PlanModel.build({
            name,
            description,
            durationInDays,
            price,
            status
        });

        await plan.save();

        res.status(201).json(plan);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong'
        });
    }
}

export const getPlans = async (req: Request, res: Response) => {

    try {
        
        const plans = await PlanModel.findAll();

        res.json(plans);

    } catch (error) {
        
        res.status(500).json({
            msg: 'Something went wrong'
        });
    }
}