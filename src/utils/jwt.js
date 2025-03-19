import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || "7d";

export const generateToken = (user) => {
    return jwt.sign(
        {
            idUser: user.idUser, 
            email: user.email,
            idRol: user.idRol,  
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
};

export const generateRefreshToken = (user) => {
    return jwt.sign(
        { idUser: user.idUser },
        JWT_SECRET,  
        { expiresIn: JWT_REFRESH_EXPIRES_IN }
    );
};
