import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SigninDto } from './dtos/signin.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly revokedTokens: string[] = [];

  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signinDto: SigninDto): Promise<any> {
    const { username, password } = signinDto;
    const user = await this.userService.findOne(username);

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const { id, firstName } = user;
    const payload = { id, username: firstName };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '2m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });

      const { id, username, lastname } = payload;

      const newPayload = { id, username, lastname };

      const accessToken = await this.jwtService.signAsync(newPayload, {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: '5m',
      });

      return {
        access_token: accessToken,
      };
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async register(createUserDto: CreateUserDto): Promise<Partial<UserEntity>> {
    const user = await this.userService.createUser(createUserDto);
    const { password, ...result } = user;
    return result;
  }

  async signOut(token: string): Promise<string> {
    this.revokeToken(token);
    return 'Logout successfully done!';
  }

  private revokeToken(token: string): void {
    this.revokedTokens.push(token);
  }

  isTokenRevoked(token: string): boolean {
    return this.revokedTokens.includes(token);
  }
}
