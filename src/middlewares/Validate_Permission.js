export const validatePermission = (req, res, next) => {
    const { idPermission, name, status } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Name is required" });
    }
    if (!status) {
        return res.status(400).json({ message: "Status is required" });
    }
    next();
}
