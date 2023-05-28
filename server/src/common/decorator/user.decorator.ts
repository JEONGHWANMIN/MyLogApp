import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetTokenUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { method, url, user } = request;

    if (user) return request.user;
    console.log(`Method ${method} called for URL ${url}`);
    return request;
  },
);
