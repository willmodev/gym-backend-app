import { Response, NextFunction, Request } from 'express';

import { RoleModel } from '../models';


export const isValidRole = async(req: Request, res: Response, next: NextFunction ) => {

    const { role: name = 'STUDENT_ROLE' } = req.body;

    try {
        const { dataValues: roleResp } = await RoleModel.findOne({ where: { name }  }) ?? {};

        if (!roleResp) { return res.status(400).json({ msg: `El rol ${name} no se encuentra registrado en DB`}) }

        req.body.role = roleResp;
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error, contact with admin 😁, jeje'
        })
        
    }

}

export const isAdminRole = (req: Request, res: Response, next: NextFunction) => {
    
    const { user, role } = req.body;

    if (!user) {
        return res.status(500).json({ msg: 'Está intentando verificar el rol si validar el token antes' });
    }

    if(role.name !== 'ADMIN_ROLE') {
        return res.status(401).json({ msg: 'No es usuario ADMIN - No puede realizar esta accion' });
    }

    next();
}