import express from "express";

export const router = express.Router();

import * as user from "../controller/users.controller";

router.post("/register", user.register);
