import express from "express";
import {
    getTanaman,
    createTanaman,
    updateTanaman,
    deleteTanaman,
    getAll,
    getDetil,
} from "../controllers/Tanaman.js";
import {upload} from "../libs/handleUpload.js";
import { verifyUser } from "../middleware/AuthUser.js";


const router = express.Router();

router.get('/tanaman/item', getAll);
router.get('/tanaman/:url', getDetil);

router.get('/tanaman', verifyUser, getTanaman);
// router.get('/tanaman/:id', verifyUser,  getTanamanById);
router.post('/tanaman', upload.single('img'), verifyUser, createTanaman);
router.patch('/tanaman/:id',upload.single('img'), verifyUser, updateTanaman);
router.delete('/tanaman/:id', verifyUser, deleteTanaman);

export default router;