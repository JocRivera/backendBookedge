import { database } from '../config/database.js';
import morgan from "morgan";
import cabinRoutes from '../routes/cabinRoutes.js';
import reservationRoutes from '../routes/ReservationsRoutes.js'
import express from "express";

export default class Server {

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use (morgan('dev'));
        this.dbConection();
        this.listen();
        this.routes();

    }

    async dbConection() {
        try {
            await database.authenticate();
            console.log('Base de datos conectdada');
        } catch (error) {
            console.error('se jodio la base de datos', error);
        }
    }

    routes(){
        this.app.use('/cabins', cabinRoutes);
        this.app.use('/reservations', reservationRoutes);
    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
        })
    }
}database