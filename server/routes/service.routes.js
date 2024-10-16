import { Router } from "express";
import {
  createService,
  getAllServices,
  getServiceDetails,
  getServiceStatusHistory,
  getRelatedIncidents,
} from "../controllers/service.controller.js";

const router = Router();

router.post("/", getAllServices);
router.get("/:serviceId", getServiceDetails);
router.get("/:serviceId/statusHistory", getServiceStatusHistory);
router.get("/:serviceId/incidents", getRelatedIncidents);

export default router;
