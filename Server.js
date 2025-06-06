import express, { json } from "express";
import { database } from "./dist/config/database.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import cabinRoutes from "./dist/routes/Cabin_Routes.js";
import comfortRoutes from "./dist/routes/Comfort_Routes.js";
// import customerRoutes from './dist/routes/Customers_Routes.js';
import serviceRoutes from "./dist/routes/Service_Route.js";
import permissionRoutes from "./dist/routes/Permission_Route.js";
import rolesRoutes from "./dist/routes/Roles_Routes.js";
import { setupAssociations } from "./dist/models/setupAssociations.js";
import companionsRoutes from "./dist/routes/Companions_Routes.js";
import reservationsRoutes from "./dist/routes/Reservations_Routes.js";
import userRoutes from "./dist/routes/User_Routes.js";
import bedromRoutes from "./dist/routes/Bedrom_Routes.js";
import planRoutes from "./dist/routes/Plan_Routes.js";
import planProgramed from "./dist/routes/Plan_Programed_Routes.js";
import PaymentsRoutes from "./dist/routes/Payments_Rutes.js";
import authRoutes from "./dist/routes/authRoutes.js";
import PrivilegeRoutes from "./dist/routes/Privileges_Routes.js";
import cabinComfortsRoutes from "./dist/routes/CabinComforts_Routes.js"
import bedroomComfortsRoute from "./dist/routes/BedroomComfortsRoutes.js"
import cabinImages from "./dist/routes/CabinImage_Routes.js"
import roomImages from "./dist/routes/RoomImage_Routes.js"
import { initSettings } from "./seeders/initSettings.js";
import dashboardRoutes from "./dist/routes/Dashboard_Routes.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default class Server {
  constructor() {
    this.app = express();
    this.app.use(
      cors({
        origin: ["http://localhost:5173", "http://localhost:5180", "http://localhost:8081"],
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(morgan("dev"));
    this.app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
    this.dbConection();
    this.listen();
    this.routes();
    this.setupAssociations();
  }


  setupAssociations() {
    try {
      setupAssociations();
    } catch (error) {
      console.error("Error al configurar las asociaciones", error);
    }
  }

  async dbConection() {
    try {
      await database.authenticate();
      console.log("Base de datos conectada");
      await database.sync({ force: false });
      console.log("Base de datos sincronizada");
      await initSettings();
      console.log("Configuraciones iniciales aplicadas");
    } catch (error) {
      console.error("Se jodió la base de datos", error);
    }
  }


  routes() {
    this.app.use("/user", userRoutes);
    this.app.use("/cabins", cabinRoutes);
    this.app.use("/comforts", comfortRoutes);
    // this.app.use('/customers', customerRoutes);
    this.app.use("/services", serviceRoutes);
    this.app.use("/companions", companionsRoutes);
    this.app.use("/reservations", reservationsRoutes);
    this.app.use("/permissions", permissionRoutes);
    this.app.use("/roles", rolesRoutes);
    this.app.use("/bedroom", bedromRoutes);
    this.app.use("/privileges", PrivilegeRoutes);
    this.app.use("/plan", planRoutes);
    this.app.use("/planProgramed", planProgramed);
    this.app.use("/payments", PaymentsRoutes);
    this.app.use("/auth", authRoutes);
    this.app.use("/cabin-comforts", cabinComfortsRoutes)
    this.app.use("/bedroom-comforts", bedroomComfortsRoute)
    this.app.use("/cabin-images", cabinImages)
    this.app.use("/room-images", roomImages)
    this.app.use("/dashboard", dashboardRoutes);

  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
    });
  }
}


