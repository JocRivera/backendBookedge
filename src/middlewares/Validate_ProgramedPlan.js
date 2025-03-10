export const createProgramedPlanValidation = (req, res, next) => {
    const { idPlan, startDate, endDate } = req.body;
    
    if(!idPlan) return res.status(400).json({ error: 'El idPlan es requerido y debe ser entero' });
    if(!startDate) return res.status(400).json({ error: 'La fecha de inicio es requerida' });
    if(!endDate) return res.status(400).json({ error: 'La fecha de finalización es requerida' });
    if(startDate > endDate) return res.status(400).json({ error: 'La fecha de inicio debe ser anterior a la de finalización' });
    next();
}

export const updateProgramedPlanValidation = (req, res, next) => {
    getProgramedPlanValidation(req, res, next);
    const { startDate, endDate } = req.body;
    if(startDate > endDate) return res.status(400).json({ error: 'La fecha de inicio debe ser anterior a la de finalización' });
    next();
}

export const getProgramedPlanValidation = (req, res, next) => {
    const { idPlan } = req.params;
    if(!idPlan) return res.status(400).json({ error: 'El idPlan es requerido y debe ser entero' });
    if(isNaN(idPlan)) return res.status(400).json({ error: 'El idPlan debe ser entero' });
    next();
}