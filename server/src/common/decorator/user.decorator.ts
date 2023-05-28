import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetTokenUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;

    if (user) return request.user;

    return request;
  },
);
