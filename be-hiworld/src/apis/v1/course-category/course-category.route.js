import { Router } from "express";
import {
    getCourseCategory,
    createCourseCategory,
    editCourseCategory,
    deleteCourseCategory
} from "./course-category.controller.js";

const router = Router();

router.get("/get-category", async (req, res) => {
    const data = await getCourseCategory(req.query);
    return data.code === -1 ? res.status(500).json(data) : res.status(200).json(data);
});

router.post("/create-category", async (req, res) => {
    const data = await createCourseCategory(req.body);
    return data.code === -1 ? res.status(500).json(data) : res.status(200).json(data);
});

router.patch("/edit-category", async (req, res) => {
    const data = await editCourseCategory(req.body);
    return data.code === -1 ? res.status(500).json(data) : res.status(200).json(data);
});

router.delete("/delete-category", async (req, res) => {
    const data = await deleteCourseCategory(req.body);
    return data.code === -1 ? res.status(500).json(data) : res.status(200).json(data);
});

export default router;
