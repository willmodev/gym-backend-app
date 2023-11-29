import { Application, Router } from 'express';
import { check } from 'express-validator';

import { checkToken, login, register } from '../controllers';
import { validateFields, isValidRole } from '../middlewares/';
import { validateEmailInDB } from '../validations';


const authRouter = Router();


authRouter.post('/login', 
    check('email', 'El correo ingresado no es valido').isEmail(),
    check('password', 'La contrasena debe tener mas de 6 caracteres').isLength({ min: 6 }),
    validateFields

,login);

authRouter.post('/register',[
    isValidRole,
    check('password', 'La contrasena debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo ingresado no es valido').isEmail(),
    check('email').custom( validateEmailInDB ),
    validateFields,
], register);

authRouter.get('/check-token', checkToken);

const authRoutes = ( app: Application ) => {
    app.use('/api/auth', authRouter);
    
}


export { authRoutes };