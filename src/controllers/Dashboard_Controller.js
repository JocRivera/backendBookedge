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
    // GET /api/dashboard/reservas-diarias?date=YYYY-MM-DD
    async getDailyReservations(req, res) {
        try {
            const { date } = req.query;
            const targetDate = date ? new Date(date) : new Date();
            const formattedDate = targetDate.toISOString().split('T')[0];

            const query = `
            SELECT 
                COUNT(idReservation) AS reservationCount
            FROM Reservations
            WHERE DATE(startDate) = ?
        `;

            const [result] = await this.sequelize.query(query, {
                replacements: [formattedDate],
                type: this.sequelize.QueryTypes.SELECT
            });

            res.status(200).json({
                message: "Reservas del día",
                date: formattedDate,
                count: result.reservationCount || 0
            });
        } catch (error) {
            console.error("Error al obtener las reservas del día", error);
            res.status(500).json({
                message: "Error al obtener las reservas del día",
                error: error.message
            });
        }
    }

    // Historia de Usuario 3: Meses menos concurridos
    async getLeastBusyMonths(req, res) {
    try {
        const { year } = req.query;
        const targetYear = year || new Date().getFullYear();

        if (!/^\d{4}$/.test(targetYear)) {
            return res.status(400).json({
                message: "Formato de año inválido. Por favor, proporcione un año válido de 4 dígitos.",
            });
        }

        const query = `
            SELECT 
                MONTH(startDate) as month, 
                COUNT(idReservation) as visitorCount 
            FROM Reservations 
            WHERE YEAR(startDate) = ?
            GROUP BY MONTH(startDate) 
            ORDER BY visitorCount ASC
        `;

        const response = await this.sequelize.query(query, {
            replacements: [targetYear],
            type: this.sequelize.QueryTypes.SELECT
        });

        if (!Array.isArray(response)) {
            return res.status(500).json({
                message: "Error en la consulta. Los datos no son un array.",
                error: "El resultado de la consulta no es un array.",
            });
        }

        if (response.length === 0) {
            return res.status(404).json({
                message: `No se encontraron reservas para el año ${targetYear}`,
                year: targetYear,
            });
        }

        const monthNames = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];

        const formattedData = response.map(item => {
            const visitorCount = parseInt(item.visitorCount);
            const monthIndex = item.month - 1;

            return {
                month: monthIndex >= 0 && monthIndex < 12 ? monthNames[monthIndex] : "Mes desconocido",
                monthNumber: item.month,
                visitorCount: isNaN(visitorCount) ? 0 : visitorCount
            };
        });

        res.status(200).json({
            message: "Meses menos concurridos",
            year: targetYear,
            data: formattedData
        });

    } catch (error) {
        console.error("Error al obtener los meses menos concurridos:", error);
        res.status(500).json({
            message: "Error al obtener los meses menos concurridos",
            error: error.message,
        });
    }
}

}