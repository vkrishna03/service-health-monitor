import { Router } from "express";
import {
  getAllIncidents,
  createIncident,
  updateIncident,
} from "../controllers/incident.controller.js";

const router = Router();

router.get("/", getAllIncidents);
router.post("/", createIncident);
router.put("/:incidentId", updateIncident);

export default router;
