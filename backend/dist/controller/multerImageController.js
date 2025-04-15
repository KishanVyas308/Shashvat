"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const route = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split(".").pop();
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
        cb(null, uniqueName);
    },
});
const upload = (0, multer_1.default)({ storage });
// POST: Upload Image
route.post("/", upload.single("image"), (req, res) => {
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});
// PUT: Update Image
route.put("/:filename", upload.single("image"), (req, res) => {
    const oldPath = `uploads/${req.params.filename}`;
    fs_1.default.unlink(oldPath, (err) => {
        if (err)
            return res.status(404).send("Old image not found");
        const newPath = `${req.file.filename}`;
        res.json({
            url: `${req.protocol}://${req.get("host")}/uploads/${newPath}`,
        });
    });
});
// DELETE: Delete Image
route.delete("/:filename", (req, res) => {
    const pathToDelete = `uploads/${req.params.filename}`;
    fs_1.default.unlink(pathToDelete, (err) => {
        if (err)
            return res.status(404).send("Image not found");
        res.send("Image deleted successfully");
    });
});
route.get("/", (req, res) => {
    fs_1.default.readdir("uploads", (err, files) => {
        if (err)
            return res.status(500).send("Could not list images");
        const urls = files.map(file => `${req.protocol}://${req.get("host")}/uploads/${file}`);
        res.json(urls);
    });
});
exports.default = route;
