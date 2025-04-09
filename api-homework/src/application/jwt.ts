import jwt from "jsonwebtoken";

const secretKey = "secretKey";

export function generateToken(uid: string): string {
  return jwt.sign({ uid }, secretKey, { expiresIn: "7d" });
}

export function verifyToken(token: string): { uid: string } | null {
  try {
    return jwt.verify(token, secretKey) as { uid: string };
  } catch {
    return null;
  }
}
