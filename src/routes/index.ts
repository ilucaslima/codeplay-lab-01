import { Router } from "express";

import { router as RouterUsers } from "./users.router";

const router = Router();

router.use("/users", RouterUsers);

export default router;
