import jwt from "jsonwebtoken";


const JWT_SECRET= process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";


export const generateToken = (user,role)=>{
    return jwt.sign(
        {
            id: user.idUser || user.idCustomer,
            email:user.email,
            role:role,
        },
        JWT_SECRET,
        {expiresIn: JWT_EXPIRES_IN}
    )
}
