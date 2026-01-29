
import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware.js";

function mapAuthErrorToHttp(error) {
    const code = error?.message || "UNKNOWN";

    switch (code) {
        case "MISSING_FIELDS":
            return { status: 400, body: { error: code } };
        case "EMAIL_EXISTS":
        case "USERNAME_EXISTS":
            return { status: 409, body: { error: code } };
        case "INVALID_CREDENTIALS":
            return { status: 401, body: { error: code } };
        case "USER_NOT_FOUND":
            return { status: 404, body: { error: code } };
        case "MISSING_REFRESH_TOKEN":
            return { status: 400, body: { error: code } };
        case "INVALID_REFRESH_TOKEN":
            return { status: 401, body: { error: code } };
        default:
            return { status: 500, body: { error: "INTERNAL_SERVER_ERROR" } };
    }
}

export function createAuthRouter({ authService, userRepo }) {
    const router = Router();

    router.post("/register", async (req, res) => {
        try {
            const { username, email, password, fullName, phone } = req.body ?? {};
            if (!username || !email || !password || !fullName) {
                throw new Error("MISSING_FIELDS");
            }

            const result = await authService.register({
                username,
                email,
                password,
                fullName,
                phone,
            });

            return res.status(201).json(result);
        } catch (e) {
            const mapped = mapAuthErrorToHttp(e);
            return res.status(mapped.status).json(mapped.body);
        }
    });

    router.post("/login", async (req, res) => {
        try {
            const { identifier, password } = req.body ?? {};
            if (!identifier || !password) {
                throw new Error("MISSING_FIELDS");
            }

            const result = await authService.login(identifier, password);
            return res.status(200).json(result);
        } catch (e) {
            const mapped = mapAuthErrorToHttp(e);
            return res.status(mapped.status).json(mapped.body);
        }
    });

    router.post("/refresh", async (req, res) => {
        try {
            const { refreshToken } = req.body ?? {};
            const result = await authService.refresh(refreshToken);
            return res.status(200).json(result);
        } catch (e) {
            const mapped = mapAuthErrorToHttp(e);
            return res.status(mapped.status).json(mapped.body);
        }
    });

    router.get("/me", requireAuth(userRepo), async (req, res) => {
        try {
            const userId = req.user?.id;
            const user = await authService.me(userId);
            return res.status(200).json({ user });
        } catch (e) {
            const mapped = mapAuthErrorToHttp(e);
            return res.status(mapped.status).json(mapped.body);
        }
    });

    return router;
}

