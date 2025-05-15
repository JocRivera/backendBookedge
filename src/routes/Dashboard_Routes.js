import express from 'express';
import { DashboardController } from '../controllers/Dashboard_Controller.js';

const router = express.Router();
const dashboardController = new DashboardController();

router.get('/topPlans', (req, res) => { dashboardController.getTopPlans(req, res); });
router.get('/dailyReservations', (req, res) => { dashboardController.getDailyReservations(req, res); });
router.get('/leastbusymonths', (req, res) => { dashboardController.getLeastBusyMonths(req, res); });

export default router;