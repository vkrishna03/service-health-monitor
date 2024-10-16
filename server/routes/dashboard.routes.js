import { Router } from "express";
import {
  getDashboardMetrics,
  getIncidentsSummary,
  getRecentServiceChecks,
} from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/metrics", getDashboardMetrics);
router.get("/incidentsSummary", getIncidentsSummary);
router.get("/recentChecks", getRecentServiceChecks);

export default router;
