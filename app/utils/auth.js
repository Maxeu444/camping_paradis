import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = "7d";

export function generateToken(user) {
    return jwt.sign({ id: user.id, email: user.email,tokenVersion: user.tokenVersion }, 
        JWT_SECRET, 
        { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }   
}

export async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
}