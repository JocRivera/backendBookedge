//post y put
export const validate_Comforts = (req, res, next) => {
  const { Name, Observation, Date_entry, Statuss } = req.body;

  if (!Name?.trim() || !Observation?.trim() || !Date_entry || !Statuss) {
    return res.status(400).json({
      error: "Faltan datos obligatorios",
      details: {
        Name: !Name?.trim() ? "Falta el nombre" : null,
        Observation: !Observation?.trim() ? "Falta la observación" : Observation,
        Date_entry: !Date_entry ? "Falta la fecha de entrada" : null,
        Statuss: !Statuss ? "Falta el estado" : null,
      },
    });
  }

  next();
};

//put delete 
export const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID no proporcionado" });
  }
  next();
};
