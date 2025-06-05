import { Reservations } from "../models/Reservations_Model.js";
import { Plans } from "../models/Plans_Model.js";
import { database } from "../config/database.js"; // Importa la instancia de conexión

export class DashboardController {
    constructor() {
        this.reservations = Reservations;
        this.plans = Plans;
        this.sequelize = database;
    }

    // Historia de Usuario 1: Top planes más solicitados
    async getTopPlans(req, res) {
        try {
            const query = `
            SELECT 
                p.idPlan, 
                p.name, 
                COUNT(r.idReservation) AS clientCount
            FROM 
                Plans p
            LEFT JOIN 
                Reservations r ON p.idPlan = r.idPlan
            GROUP BY 
                p.idPlan, p.name
            ORDER BY 
                clientCount DESC
            LIMIT 5
            `;

            const topPlans = await this.sequelize.query(query, {
                type: this.sequelize.QueryTypes.SELECT
            });

            res.status(200).json({
                message: "Top 5 planes más solicitados",
                data: topPlans
            });
        } catch (error) {
            console.error("Error al obtener los planes más reservados", error);
            res.status(500).json({
                message: "Error al obtener los planes más reservados",
                error: error.message,
            });
        }
    }
    // Historia de Usuario 2: Reservas del día
    async getDailyReservations(req, res) {
        try {
            const { date } = req.query;
            const targetDate = date ? new Date(date) : new Date();

            // Format the date to match only the date part (YYYY-MM-DD)
            const formattedDate = targetDate.toISOString().split('T')[0];

            // Consulta SQL directa para obtener las reservaciones por hora
            const query = `
            SELECT 
                HOUR(startDate) as hour,
                COUNT(idReservation) as reservationCount
            FROM Reservations
            WHERE DATE(startDate) = ?
            GROUP BY HOUR(startDate)
            ORDER BY hour ASC
        `;

            const reservations = await this.sequelize.query(query, {
                replacements: [formattedDate],
                type: this.sequelize.QueryTypes.SELECT
            });

            res.status(200).json({
                message: "Reservas del día",
                date: formattedDate,
                data: reservations
            });
        } catch (error) {
            console.error("Error al obtener las reservas del día", error);
            res.status(500).json({
                message: "Error al obtener las reservas del día",
                error: error.message,
            });
        }
    }
    // Historia de Usuario 3: Meses menos concurridos
    async getLeastBusyMonths(req, res) {
        try {
            // Obtener el año actual si no se proporciona
            const { year } = req.query;
            const targetYear = year || new Date().getFullYear();

            // Consulta simple de conteo de reservas por mes
            const query = `
            SELECT 
                MONTH(startDate) as month, 
                COUNT(idReservation) as visitorCount 
            FROM Reservations 
            WHERE YEAR(startDate) = ?
            GROUP BY MONTH(startDate) 
            ORDER BY visitorCount ASC
        `;

            const [visitorsByMonth] = await this.sequelize.query(query, {
                replacements: [targetYear],
                type: this.sequelize.QueryTypes.SELECT
            });

            // Convertir el número de mes a nombre del mes
            const monthNames = [
                "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ];

            const formattedData = Array.isArray(visitorsByMonth) ? visitorsByMonth.map(item => ({
                month: monthNames[item.month - 1],
                monthNumber: item.month,
                visitorCount: parseInt(item.visitorCount)
            })) : [];

            res.status(200).json({
                message: "Meses menos concurridos",
                year: targetYear,
                data: formattedData
            });
        } catch (error) {
            console.error("Error al obtener los meses menos concurridos", error);
            res.status(500).json({
                message: "Error al obtener los meses menos concurridos",
                error: error.message,
            });
        }
    }
}