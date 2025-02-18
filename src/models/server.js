import express, {json} from 'express';
import { database } from '../config/database.js';
import morgan from "morgan";




export default class Server {

    constructor() {
        this.app = express();
        this.app.use(json());
        this.app.use (morgan('dev'));
        this.dbConection();
        this.listen();

    }

    async dbConection() {
        try {
            await database.authenticate();
            console.log('Base de datos conectdada');
        } catch (error) {
            console.error('se jodio la base de datos', error);
        }
    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
        })
    }
}database