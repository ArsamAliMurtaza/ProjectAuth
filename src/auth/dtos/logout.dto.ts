import { IsNotEmpty, IsString } from 'class-validator';

export class logoutDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  refreshToken: string;
}
