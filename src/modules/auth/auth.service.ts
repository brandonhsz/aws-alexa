import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username, password) {
    return username && password;
  }

  async login(user: any) {
    if (!user.username || !user.password) {
      return new UnauthorizedException();
    }
    const payload = { username: user.username };
    const jwt = this.jwtService.sign(payload);

    return {
      access_token: jwt,
    };
  }

  async refreshToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token, {
        ignoreExpiration: true,
      });

      const userId = decoded.sub;

      // const user = await this.validateUserById(userId);
      // if (!user) {
      //   throw new UnauthorizedException();

      console.log(decoded);
      const payload = { username: 'nuevo token' };
      const access_token = this.jwtService.sign(payload);
      console.log('*******************');
      console.log(decoded);
      console.log('*******************');

      return {
        access_token,
        decodedToken: this.jwtService.decode(access_token),
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
