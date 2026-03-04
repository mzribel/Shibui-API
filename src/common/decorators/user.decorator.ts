import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import type { Request } from "express";
import type { User } from "@/modules/users/models/user";

type RequestWithUser = Request & {user?:User};

export const CurrentUser = createParamDecorator(
    (_:unknown, ctx:ExecutionContext): User | null => {
        const req = ctx.switchToHttp().getRequest<RequestWithUser>();
        if (!req.user) return null;
        return req.user;
    }
)