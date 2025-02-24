export const validateService = (req, res, next) => {
    const { Id_Service, name, Description, Price, StatusServices } = req.body;
    if (!name || !Description || !Price || !StatusServices) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    if (Price < 0) {
        return res.status(400).json({ error: "El precio no puede ser negativo" });
    }

    next();

}