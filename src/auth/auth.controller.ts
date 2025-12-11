import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('verify-login-otp')
  verifyLoginOtp(@Body() body: { email: string; otp: string }) {
    return this.authService.verifyLoginOtp(body.email, body.otp);
  }

  @Get('profile')
  profile(@Headers('authorization') header: string) {
    return this.authService.getProfileFromToken(header);
  }

  @Post('forgot-password')
  forgot(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  reset(@Body() body: { token: string; password: string }) {
    return this.authService.resetPassword(body.token, body.password);
  }
}
