import { Router } from "express";
import Ver1 from "./v1/index";

const routes = Router();

routes.use("/v1", Ver1);

export default routes;
