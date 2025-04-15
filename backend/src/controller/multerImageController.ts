import { Router } from "express";
import multer from "multer";
import fs from "fs";

const route = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}.${ext}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// POST: Upload Image
route.post("/", upload.single("image"), (req: any, res: any) => {
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  res.json({ url: fileUrl });
});

// PUT: Update Image
route.put(
  "/:filename",
  upload.single("image"),
  (req: any, res: any) => {
    const oldPath = `uploads/${req.params.filename}`;
    fs.unlink(oldPath, (err) => {
      if (err) return res.status(404).send("Old image not found");
      const newPath = `${req.file.filename}`;
      res.json({
        url: `${req.protocol}://${req.get("host")}/uploads/${newPath}`,
      });
    });
  }
);

// DELETE: Delete Image
route.delete("/:filename", (req: any, res: any) => {
  const pathToDelete = `uploads/${req.params.filename}`;
  fs.unlink(pathToDelete, (err) => {
    if (err) return res.status(404).send("Image not found");
    res.send("Image deleted successfully");
  });
});

route.get("/", (req, res) => {
    fs.readdir("uploads", (err, files) => {
      if (err) return res.status(500).send("Could not list images");
      const urls = files.map(file => `${req.protocol}://${req.get("host")}/uploads/${file}`);
      res.json(urls);
    });
  });

export default route