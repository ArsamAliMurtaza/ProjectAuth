import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SigninDto } from './dtos/signin.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private revokedTokens: string[] = [];

  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signinDto: SigninDto): Promise<any> {
    const { username, password: pass } = signinDto;
    const user = await this.userService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;

    const payload = { id: user.id, username: user.firstName };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: 'accessTokenSecret',
      expiresIn: '60s',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: 'refreshTokenSecret',
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: 'secret',
      });

      const { id, username, lastname } = payload;

      const newPayload = { id, username, lastname };

      const accessToken = await this.jwtService.signAsync(newPayload, {
        secret: 'secret',
        expiresIn: '100s',
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
    return 'Logout succesfully done!';
  }

  private revokeToken(token: string): void {
    this.revokedTokens.push(token);
  }

  isTokenRevoked(token: string): boolean {
    return this.revokedTokens.includes(token);
  }
}
