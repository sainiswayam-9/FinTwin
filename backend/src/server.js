import express from "express";
import cors from "cors";

import { createAuthRouter } from "./controllers/auth/auth.controller.js";
import { AuthService } from "./controllers/auth/auth.service.js";
import { UserRepository } from "./controllers/auth/userRepo.js";

export function createApp() {
    const app = express();

    app.use(cors());
    app.use(express.json());

    const userRepo = new UserRepository();
    const authService = new AuthService(userRepo);

    app.get("/health", (req, res) => res.json({ ok: true }));
    app.use("/auth", createAuthRouter({ authService, userRepo }));

    return app;
}

export function startServer() {
    const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    const app = createApp();

    app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`Server listening on http://localhost:${port}`);
    });
}
