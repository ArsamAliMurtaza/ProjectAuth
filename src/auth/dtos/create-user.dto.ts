import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchConstraint } from 'src/common/decorators/match-properties.decorator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Incorrect email address' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,15}$/, {
    message: "password criteria doesn't meet",
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Validate(MatchConstraint, ['password'])
  confirmPassword: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;
}
