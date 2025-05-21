import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = Router();

const imagesDir = path.join(__dirname, '../../images');

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, imagesDir);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.get("/upload", (_req, res) => {
    res.send("Hello from multer route");
});

// Upload image and return its URL
router.post("/upload", upload.any(), (req:any, res:any) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    const file = req.files[0];
    const imageUrl = `http://localhost:3000/api/v1/multer/image/${file.filename}`;
    res.json({ imageUrl });
});

// Serve image by name
router.get("/image/:name", (req:any, res:any) => {
    const filePath = path.join(imagesDir, req.params.name);
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: "Image not found" });
        }
        res.sendFile(filePath);
    });
});

export default router;
