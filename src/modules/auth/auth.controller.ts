import { BadRequestException, Body, Controller, Get, NotImplementedException, Post, Query, Req } from '@nestjs/common';
import { Public } from '@/common/decorators/roles.decorator';
import { LoginDto } from '@modules/auth/dto/login.dto';
import { RegisterDto } from '../account/dto/register.dto';
import { AuthService } from '@modules/auth/auth.service';
import { CurrentUser } from '@common/decorators/user.decorator';
import { User } from '@modules/users/models/user';
import { AccessToken } from '@common/decorators/token.decorator';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  login(@Body() dto:LoginDto) {
    return this.authService.loginWithPassword(dto.email, dto.password)
  }

  @Public()
  @Get("request-password-reset")
  requestPasswordRest(@Query("email") email:string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return this.authService.requestPasswordReset(email);
  }

  @Public()
  @Post("reset-password")
  resetPassword(@Query("otp") otp:string, @Body() dto: RegisterDto) {
    if (!otp) {
      throw new BadRequestException('One-time password is required');
    }
    return this.authService.resetPassword(otp, dto);
  }

  @Public()
  @Post("refresh")
  refresh(@Body() dto: { refreshToken: string }) {
    return this.authService.refreshToken(dto.refreshToken);
  }

  @Public()
  @Post("logout")
  logout(@AccessToken() token : string) {
    return this.authService.logout(token)
  }
}
