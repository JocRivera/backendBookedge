export const validatePermission = (req, res, next) => {
    const { name, status } = req.body; // idPermission eliminado
    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }
    if (/^\d+$/.test(name)) {
        return res.status(400).json({ error: "El nombre no puede contener números" });
    }
    if (!status) {
        return res.status(400).json({ message: "Status is required" });
    }
    if (typeof status !== 'boolean') {
        return res.status(400).json({
            msg: 'status must be a boolean'
        });
    }
    next();
}
