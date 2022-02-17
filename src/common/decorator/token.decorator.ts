import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const auth =
      request.headers['authorization'] ||
      request.headers['Authorization'] ||
      null;

    if (!auth) {
      throw new UnauthorizedException();
    }

    try {
      const decoded = jwt.verify(
        auth.split('Bearer ')[1],
        process.env.JWT_SECRET,
      );
      return decoded;
    } catch (e) {
      throw new UnauthorizedException();
    }
  },
);
