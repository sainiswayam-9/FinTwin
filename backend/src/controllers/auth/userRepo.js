import { eq } from 'drizzle-orm';
import { usersTable, db } from '../../db/index.js';
import { config } from '../../conf/index.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class UserRepository {
    async findUserByEmail(email) {
        const existingUsers = await db.select().from(usersTable).where(eq(usersTable.email, email));
        return existingUsers[0] || null;
    };

    async findUserByUsername(username) {
        const existingUsers = await db.select().from(usersTable).where(eq(usersTable.username, username));
        return existingUsers[0] || null;
    }

    async findUsername(username) {
        const existingUsers = await db.select().from(usersTable).where(eq(usersTable.username, username));
        return existingUsers[0] || null;
    }

    async createUser(userData) {
        const [newUser] = await db.insert(usersTable).values(userData).returning();
        return newUser;
    };

    async findById(id) {
        const user = await db.select().from(usersTable).where(eq(usersTable.id, id));
        return user[0] || null;
    };

    async comparePassword(plainPassword, hashedPassword) {
        return bcrypt.compare(plainPassword, hashedPassword);
    };

    async hashedPassword(password) {
        return bcrypt.hash(password, 20);
    };

    async createRefeshToken(userId) {
        const refreshToken = jwt.sign(
            { id: userId },
            config.refreshTokenSecret,
            { expiresIn: config.refreshTokenExpiry }
        );
        return refreshToken;
    };

    async createAccessToken(userId) {
        const accessToken = jwt.sign(
            { id: userId },
            config.jwtSecret,
            { expiresIn: config.accessTokenExpiry }
        );
        return accessToken;
    };

    async verifyAccessToken(token) {
        return jwt.verify(token, config.jwtSecret);
    }

    async verifyRefreshToken(token) {
        return jwt.verify(token, config.refreshTokenSecret);
    }



};