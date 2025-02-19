import express from "express"
import { getAllCabins

 } from "../controllers/servicesControllers.js"
 const router = express.Router(); 
 router.get ("/", getAllCabins);
 
 export default router
