import jwt from "jsonwebtoken";
import { config } from "./config-constant.util.js";

const createAccessToken = (user) => {
    return jwt.sign(user, config.ACCESS_TOKEN_SECRET, { expiresIn: config.ACCESS_TOKEN_LIFE });
};

const createRefreshToken = (user) => {
    return jwt.sign(user, config.REFRESH_TOKEN_SECRET, { expiresIn: config.REFRESH_TOKEN_LIFE });
};

export { createAccessToken, createRefreshToken };
