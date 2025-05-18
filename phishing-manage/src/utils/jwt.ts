import { jwtConfig } from '../config/config';
import * as jwt from 'jsonwebtoken';

export interface JwtPayload {
  id: string;
  email?: string;
}

export const generateRefreshToken = (id: string) => {
  return jwt.sign({ id }, jwtConfig.refreshTokenSecret, {
    expiresIn: '7d',
  });
};

export const generateAccessToken = (payload: any) => {
  return jwt.sign(payload, jwtConfig.accessTokenSecret, {
    expiresIn: '10m',
  });
};

export const verifyAccessToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, jwtConfig.accessTokenSecret);
    return { valid: true, expired: false, decoded };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.name === 'TokenExpiredError',
      msg: error.message,
      decoded: null as null,
    };
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    const decoded = jwt.verify(
      token,
      jwtConfig.refreshTokenSecret,
    ) as JwtPayload;

    return { valid: true, expired: false, decoded };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.name === 'TokenExpiredError',
      msg: error.message,
      decoded: null as null,
    };
  }
};
