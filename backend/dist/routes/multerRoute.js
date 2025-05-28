"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
const imagesDir = path_1.default.join(__dirname, '../../images');
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, imagesDir);
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage });
router.get("/upload", (_req, res) => {
    res.send("Hello from multer route");
});
// Upload image and return its URL
router.post("/upload", upload.any(), (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No file uploaded" });
    }
    const file = req.files[0];
    const imageUrl = `http://localhost:3000/api/v1/multer/image/${file.filename}`;
    res.status(200).json({ imageUrl });
});
// Serve image by name
router.get("/image/:name", (req, res) => {
    const filePath = path_1.default.join(imagesDir, req.params.name);
    fs_1.default.access(filePath, fs_1.default.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ error: "Image not found" });
        }
        res.sendFile(filePath);
    });
});
// Delete image by name
router.delete("/image/:name", (req, res) => {
    const filePath = path_1.default.join(imagesDir, req.params.name);
    fs_1.default.unlink(filePath, (err) => {
        if (err) {
            return res.status(404).json({ error: "Image not found" });
        }
        res.status(204).send();
    });
});
// update image by name
router.put("/image/:name", upload.single("image"), (req, res) => {
    const oldFilePath = path_1.default.join(imagesDir, req.params.name);
    const newFilePath = path_1.default.join(imagesDir, req.file.filename);
    fs_1.default.rename(oldFilePath, newFilePath, (err) => {
        if (err) {
            return res.status(404).json({ error: "Image not found" });
        }
        res.status(204).send();
    });
});
exports.default = router;
