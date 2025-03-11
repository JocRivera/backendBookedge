import jwt from "jsonwebtoken";

export const verifyToken = (req,res,next) =>{
    const token = req.cookies.authToken; // aquiiiii tenemos que leer la cookie que hice el controllador

    if (!token) {
        return res.status(401).json({message: "acceso denegado. No hay Token"});
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({message : "Error Token invalido o Expirado"});
    }
}