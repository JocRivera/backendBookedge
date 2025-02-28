import express, { json } from 'express';
import { database } from './src/config/Database.js';
import morgan from "morgan";
import cabinRoutes from './src/routes/Cabin_Routes.js';
import comfortRoutes from './src/routes/Comfort_Routes.js';
import customerRoutes from './src/routes/Customers_Routes.js';
import reservationRoutes from './src/routes/Reservations_Routes.js'
import companionRoutes from './src/routes/Companions_Routes.js'
import serviceRoutes from './src/routes/Service_Route.js';
import  {setupAssociations}  from './src/models/setupAssociations.js';
export default class Server {

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.dbConection();
        this.listen();
        this.routes();
        this.setupAssociations();

    }
    
    setupAssociations() {
        try {
            setupAssociations();
        } catch (error) {
            console.error('Error al configurar las asociaciones', error);
        }
    }

    async dbConection() {
        try {
            await database.authenticate();
            console.log('Base de datos conectada');
        } catch (error) {
            console.error('Se jodió la base de datos', error);
        }
    }

    routes() {
        this.app.use('/cabins', cabinRoutes);
        this.app.use('/comforts', comfortRoutes);
        this.app.use('/customers', customerRoutes);
        this.app.use('/reservations', reservationRoutes);
        this.app.use('/companions', companionRoutes);
        this.app.use('/services', serviceRoutes);
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
        })
    }
} 