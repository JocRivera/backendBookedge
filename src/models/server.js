import express, { json } from 'express';
import { database } from '../config/database.js';
import morgan from "morgan";
import cabinRoutes from '../routes/cabinRoutes.js';
import comfortRoutes from '../routes/comfortRoutes.js';
import customerRoutes from '../routes/customersRoutes.js';
import reservationRoutes from '../routes/ReservationsRoutes.js'
import {setupAssociations} from '../models/Setup_Associations.js'
import serviceRoutes from '../routes/serviceRoute.js';

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
    setupAssociations(){
        try {
            setupAssociations();
            console.log('Llaves relacionadas exitosamente ');
        } catch (error) {
            console.log('Error al crear las llaves relacionadas ')
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
        this.app.use('/services', serviceRoutes);
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
        })
    }
} 