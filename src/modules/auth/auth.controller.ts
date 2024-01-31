import {
  Controller,
  Get,
  Headers,
  Post,
  Render,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }

  @UseGuards(AuthGuard('local'))
  @Post('')
  async login(@Request() req, @Response() res) {
    // return this.authService.login(req.body);
    res.redirect(
      'https://pitangui.amazon.com/spa/skill/account-linking-status.html?vendorId=M2MK17LVKJ8S1F',
    );
    
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh-token')
  async refreshToken(@Headers('authorization') authorization: string) {
    const token = authorization.replace('Bearer ', ''); // Extraer el token de Bearer
    return this.authService.refreshToken(token);
  }
}
