const jwt = require('jsonwebtoken');
const JWT_USER_PASS = require('./config');

const authenticateToken = (req,res,next)=> {

    console.log('req.headers:', req.headers);

    const authHeader = req.headers['authorization'];
    
     console.log('JWT_USER_PASS:', JWT_USER_PASS); // Debug log

    if (!authHeader) {
        return res.status(401).json({ message: 'Access token missing!' });
    }

    const token = authHeader.split(' ')[1]; // Extract token
    console.log('Extracted Token:', token); // Debug log
    console.log('token:', token);



    if (!token) {
        return res.status(401).json({ message: 'Token missing!' });
    }

     //Verify the token
     jwt.verify(token, JWT_USER_PASS, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token!',err });
        }

        // Attach user information to the request
        req.user = user;
        next();
    });



}

module.exports = authenticateToken;