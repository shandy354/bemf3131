import express from "express";
import {
  getTanaman,
  createTanaman,
  updateTanaman,
  deleteTanaman,
  getDetilById,
  up,
  getAll,
  getDetil,
} from "../controllers/Tanaman.js";
import { upload } from "../libs/handleUpload.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/tanaman/item", getAll);
router.get("/tanaman/:url", getDetil);

router.get("/tanaman", verifyUser, getTanaman);
router.get("/tanamandetil/:id", verifyUser, getDetilById);
router.post("/tanaman", upload.single("img"), verifyUser, createTanaman);
router.put("/tanamanup/:id", upload.single("img"), verifyUser, up);
router.delete("/tanaman/:id", verifyUser, deleteTanaman);

export default router;
