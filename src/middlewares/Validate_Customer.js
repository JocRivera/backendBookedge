// Funciones que se ejecutan antes de los controllers
// Realizan validaciones de datos
// Verifican autenticación/autorización 

// El método next() de JavaScript devuelve un objeto con las propiedades done y value

export const validateCustomer = (req, res, next) => {
    const { Name, Last_Name, Email, Password, Birth_Date } = req.body;
    if (!Name || !Last_Name || !Email || !Password || !Birth_Date) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    if (Password.length < 8) {
        return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres" });
    }

    if (!Email.includes('@')) {
        return res.status(400).json({
            error: 'Invalid email format'
        });
    }

    next();
}