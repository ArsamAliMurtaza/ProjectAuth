import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto } from './dtos/signin.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthGuard, Public } from 'src/auth/auth.guard';
import { TokenDto } from './dtos/token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signinDto: SigninDto): Promise<any> {
    return this.authService.signIn(signinDto);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() createUserDto: CreateUserDto): Promise<Partial<UserEntity>> {
    return this.authService.register(createUserDto);
  }

  @Get('profile')
  // @UseGuards(AuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('generateAccessToken')
  refreshToken(@Body() tokenDto: TokenDto): Promise<any> {
    const { refreshToken } = tokenDto;
    return this.authService.refreshToken(refreshToken);
  }

  @Public()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async signOut(@Request() req): Promise<string> {
    const token = req.headers.authorization?.split(' ')[1];
    const message = await this.authService.signOut(token);
    return message;
  }
}
