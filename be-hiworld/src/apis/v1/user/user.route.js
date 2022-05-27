import { Router } from "express";
import { getUser } from "./user.controller.js";

const router = Router();

router.get("/get-user", async (req, res) => {
    const data = await getUser(req.query);
    return data.code === -1 ? res.status(500).json(data) : res.status(200).json(data);
});

export default router;
