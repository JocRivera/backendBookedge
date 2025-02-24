import {
  getAllCabinsService,
  getCabinByIdService,
  createCabinService,
  updateCabinService,
  deleteCabinService,
  addComfortsService,
  deleteComfortsService,
} from "../services/Cabin_Services.js";
import upload  from "../middlewares/Multer.js";

export const getAllCabins = async (req, res) => {
  try {
    const cabins = await getAllCabinsService();
    res.status(200).json(cabins);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las cabañas" });
  }
};

export const getCabinById = async (req, res) => {
  try {
    const cabin = await getCabinByIdService(req.params.id);
    if (!cabin) {
      return res.status(404).json({ error: "Cabaña no encontrada" });
    }
    res.status(200).json(cabin);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la cabaña" });
  }
};

// Crear una nueva cabaña
export const createCabin = async (req, res) => {
  upload.single("Imagen")(req, res, async (error) => {
    if (error) {
      return res.status(400).json({ error: "Error al subir la imagen" });
    }
    try {
      const cabinData = {
        ...req.body,
        Imagen: req.file ? req.file.filename : null, // Guardar el nombre del archivo
      };
      const cabin = await createCabinService(cabinData);
      res.status(201).json(cabin);
    } catch (error) {
      res.status(500).json({ error: "Error al crear la cabaña" });
    }
  });
};

export const updateCabin = async (req, res) => {
  upload.single("Imagen")(req, res, async (error) => {
    if (error) {
      return res.status(400).json({ error: "Error al subir la imagen" });
    }
    try {
      const cabinData = {
        ...req.body,
        Imagen: req.file ? req.file.filename : req.body.Imagen, //valido aca si se subio una imagen nueva para actulizarla
      };
      const updatedCabin = await updateCabinService(req.params.id, cabinData);
      if (!updatedCabin) {
        return res.status(404).json({ error: "Cabaña no encontrada" });
      }
      res.status(200).json(updatedCabin);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar la cabaña" });
    }
  });
};

export const deleteCabin = async (req, res) => {
  try {
    const deletedCabin = await deleteCabinService(req.params.id);
    if (!deletedCabin) {
      return res.status(404).json({ error: "Cabaña no encontrada" });
    }
    res.status(200).json({ message: "Cabaña eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la cabaña" });
  }
};

export const addComforts = async (req, res) => {
  try {
    const { status, Date_entry } = req.body;
    const { id, comfortId } = req.params;
    const result = await addComfortsService(id, comfortId, status, Date_entry);
    if (!result) {
      return res.status(404).json({ error: "Cabaña o comodidad no encontrada" });
    }
    res.status(200).json({ message: "Comodidad agregada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar la comodidad" });
  }
};


export const deleteComforts = async (req, res) => {
  try {
    const result = await deleteComfortsService(req.params.id, req.params.comfortId);
    if (!result) {
      return res.status(404).json({ error: "Cabaña o comodidad no encontrada" });
    }
    res.status(200).json({ message: "Comodidad eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la comodidad" });
  }
};