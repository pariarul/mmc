import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'mmc-secret-default-key-123456';

export function signToken(payload, expiresIn = '8h') {
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    return null;
  }
}
