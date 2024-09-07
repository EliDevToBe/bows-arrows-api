const jwt = require('jsonwebtoken');

export const generateToken = (payload) => {
    const secretKey = 'yourSecretKey'; // Replace with your own secret key
    const options = {
        expiresIn: '1h', // Token expiration time
    };

    const token = jwt.sign(payload, secretKey, options);
    return token;
};

export function validateToken(req, res, next) {

    const authRequest = req.headers.authorization;

    if (authRequest) {
        console.log(authRequest)
    }
}

export function authMiddleware() {
    return (req, res, next) => {

        const auth = req.headers.authorization;

        if (auth) {
            //Check en DB si c'est valide
        } else {
            res.redirect("/register")
        }

    }
}