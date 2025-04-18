export const validateService = (req, res, next) => {
    const { name, Description, Price, StatusServices } = req.body;
    // if (!Id_Service || Id_Service < 0 || !Number.isInteger(Id_Service)) {
    //     return res.status(400).json({
    //         msg: 'verifique el Id_Service, debe ingresar un número entero mayor a 0'
    //     })
    // }
    if (!name) {
        return res.status(400).json({
            msg: 'name is required'
        })
    }
    if (/^\d+$/.test(name)) {
        return res.status(400).json({
            msg: 'name must be a string'
        })
    }
    if (!Description) {
        return res.status(400).json({
            msg: 'Description is required'
        })
    }
    if (/^\d+$/.test(name)) {
        return res.status(400).json({
            msg: 'Description must be a string'
        })
    }
    if (!Price) {
        return res.status(400).json({
            msg: 'Price is required'
        })
    }
    if (typeof StatusServices !== 'boolean') {
        return res.status(400).json({
            msg: 'status must be a boolean'
        });
    }

    if (Price < 0) {
        return res.status(400).json({ error: "El precio no puede ser negativo" });
    }


    next();

}