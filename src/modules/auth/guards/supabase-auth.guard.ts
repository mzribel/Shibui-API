import { IS_PUBLIC_KEY } from "@/common/decorators/roles.decorator";
import { User } from "@/modules/users/models/user";
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  Optional,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { SupabaseClient, User as SupabaseUser, createClient } from "@supabase/supabase-js";
import { Request } from "express";
import { UserService } from '@modules/users/user.service';

type RequestWithUser = Request & { user?: User };

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  private readonly logger = new Logger(SupabaseAuthGuard.name);
  private readonly supabaseClient: SupabaseClient;

  constructor(
    private readonly reflector: Reflector,
    private readonly userService: UserService,
    @Optional() @Inject("SUPABASE_CLIENT") client?: SupabaseClient

  ) {
    this.supabaseClient = client || this.initializeSupabaseClient();
  }

  private initializeSupabaseClient(): SupabaseClient {
    this.logger.debug("Supabase auth guard initializing new Supabase client.");
    if (!process.env.SUPABASE_URL) {
      throw new Error("SUPABASE_URL is not set.");
    }
    if (!process.env.SUPABASE_ANON_KEY) {
      throw new Error("SUPABASE_ANON_KEY is not set.");
    }
    return createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const supabaseUser:SupabaseUser|null = await this.authenticateRequest(request);
    let user:User|null = null;

    if (supabaseUser) {
      user = await this.userService.getByexternalUserId(supabaseUser.id);
      if (!user && !isPublic) {
        throw new UnauthorizedException("User not found in application DB");
      }
      request.user = user ?? undefined;
    }

    if (!isPublic && !user) {
      throw new UnauthorizedException("Bad token or no token provided");
    }

    return true;
  }

  private async authenticateRequest(request: Request): Promise<SupabaseUser|null> {
    const token = this.extractTokenFromHeader(request);
    if (!token) return null;
    return await this.getUserFromJWT(token) ?? null;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const auth = request.headers.authorization;
    if (!auth) return undefined;

    const [type, token] = auth.split(" ");
    if (type !== "Bearer") return undefined;
    if (!token || token === "undefined") return undefined;
    return token;
  }

  private async getUserFromJWT(token: string): Promise<SupabaseUser | undefined> {
    const { data, error } = await this.supabaseClient.auth.getUser(token);
    if (error) return undefined;
    return data.user ?? undefined;
  }
}
