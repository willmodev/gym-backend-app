import { Application, Router } from 'express';
import { check } from 'express-validator';

import { validateFields, validateJWT, isAdminRole } from '../middlewares';
import { deleteUser, getUsers, updateUser } from '../controllers';
import { existUserById, validateEmailInDB } from '../validations';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.delete('/:id',
    validateJWT,
    isAdminRole,
    check('id').custom( existUserById ),
    validateFields
, deleteUser)

userRouter.put('/:id', 
    check('email', 'El correo ingresado no es valido').isEmail(),
    check('email').custom( validateEmailInDB ),
    check('id').custom( existUserById ),
    validateFields
, updateUser)

const userRoutes = (app: Application) => {
    app.use('/api/users', userRouter);
}

export { userRoutes };