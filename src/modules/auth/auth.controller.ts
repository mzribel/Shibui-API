import { BadRequestException, Body, Controller, Get, NotImplementedException, Post, Query } from '@nestjs/common';
import { Public } from '@/common/decorators/roles.decorator';
import { LoginDto } from '@modules/auth/dto/login.dto';
import { RegisterDto } from '../account/dto/register.dto';
import { AuthService } from '@modules/auth/auth.service';

@Public()
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login(@Body() dto:LoginDto) {
    return this.authService.loginWithPassword(dto.email, dto.password)
  }

  @Get("request-password-reset")
  requestPasswordRest(@Query("email") email:string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return this.authService.requestPasswordReset(email);
  }

  @Post("reset-password")
  resetPassword(@Query("otp") otp:string, @Body() dto: RegisterDto) {
    if (!otp) {
      throw new BadRequestException('One-time password is required');
    }
    return this.authService.resetPassword(otp, dto);
  }

  @Post("refresh")
  refresh(@Body() dto: { refreshToken: string }) {
    return this.authService.refreshToken(dto.refreshToken);
  }
}
