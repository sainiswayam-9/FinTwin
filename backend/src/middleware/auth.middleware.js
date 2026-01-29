export function requireAuth(userRepo) {
    return async function requireAuthMiddleware(req, res, next) {
        try {
            const header = req.headers.authorization;
            if (!header?.startsWith("Bearer ")) {
                return res.status(401).json({ error: "MISSING_AUTH_HEADER" });
            }

            const token = header.slice("Bearer ".length);
            const decoded = await userRepo.verifyAccessToken(token);
            const userId = decoded?.id;
            if (!userId) {
                return res.status(401).json({ error: "INVALID_TOKEN" });
            }

            req.user = { id: userId };
            return next();
        } catch (e) {
            return res.status(401).json({ error: "INVALID_TOKEN" });
        }
    };
}
