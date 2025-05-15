import express from 'express';
import { DashboardController } from '../controllers/Dashboard_Controller.js';

const router = express.Router();
const dashboardController = new DashboardController();

router.get('/topPlans', (req, res) => {
    dashboardController.getTopPlans(req, res);
}
);

export default router;