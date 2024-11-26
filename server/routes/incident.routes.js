import { Router } from "express";
import {
  getAllIncidents,
} from "../controllers/incident.controller.js";

const router = Router();

router.get("/", getAllIncidents);

export default router;
