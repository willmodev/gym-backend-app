import jwt from 'jsonwebtoken';

export const generateJWT = (uid = '') => {
    
    const payload = { uid }

    return new Promise((resolve, reject) => {
        jwt.sign( payload, String(process.env.PRIVATE_KEY), { expiresIn: '4d' }, (err, token) => {

            if(err) {
                console.log(err);
                reject('Error al generar el token');
            } else {
                resolve( token );
            }
        })
    })
}