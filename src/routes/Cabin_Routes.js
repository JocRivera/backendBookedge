import express from 'express';
import {
  getAllCabins,
  getCabinById,
  createCabin,
  updateCabin,
  deleteCabin,
  addComforts,
  updateComforts,
  changeStatusCabin,
} from '../controllers/Cabins_Controllers.js';
import {
  createCabinValidation,
  updateCabinValidation,
  deleteCabinValidation,
  getCabinValidation,
  changeStateCabinValidation
} from '../middlewares/Valide_Cabins.js';
import upload from '../middlewares/Multer.js';

const router = express.Router();

// Rutas para cabañas
router.get('/', getAllCabins);
router.get('/:id', getCabinValidation, getCabinById);
router.post('/', upload.single('imagen'), createCabinValidation, createCabin);
router.put('/:id', updateCabinValidation, updateCabin);
router.delete('/:id', deleteCabinValidation, deleteCabin);
router.patch('/:id/status', changeStateCabinValidation, changeStatusCabin);


// Rutas para comodidades de cabañas
router.post('/:id/comforts/:comfortId', addComforts);
router.put('/:id/comforts/:comfortId', updateComforts);
export default router;