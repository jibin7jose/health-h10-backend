import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto) {
    return this.authService.login(dto);
  }

  @Get('profile')
  profile(@Headers('authorization') authHeader: string) {
    return this.authService.getProfileFromToken(authHeader);
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
