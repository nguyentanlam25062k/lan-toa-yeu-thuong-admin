// import { Router } from "express";
// import { uploadMulter } from "../../../utils";
// import { validateImage } from "../../../middlewares";
// import uploadController from "./upload.controller";
// const router = Router();

// router.post("/upload-image", uploadMulter.array("image", 4), validateImage, async (req, res) => {
//     const data = await uploadController.uploadImage(req.files);
//     return data.code === -1 ? res.status(500).json(data) : res.status(200).json(data);
// });

// router.post("/delete-image", async (req, res) => {
//     const data = await uploadController.deleteImage(req.body);
//     return data.code === -1 ? res.status(500).json(data) : res.status(200).json(data);
// });

// export default router;
