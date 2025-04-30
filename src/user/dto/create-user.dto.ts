import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
  IsOptional
} from 'class-validator';
import { Role } from '../enums/role.enum';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: "Name must have atleast 2 characters." })
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(3, { message: "Username must have atleast 3 characters." })
  @IsAlphanumeric(null, {
    message: "Username does not allow other than alpha numeric chars.",
  })
  full_name: string;

  @IsNotEmpty()
  @IsEmail(null, { message: "Please provide valid Email." })
  email: string;

  @IsNotEmpty()
  /*Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })*/
  password: string;

  @IsEnum(Role)
  role: Role;

  @IsOptional()
  avatar: string;

  @IsInt()
  @IsOptional()
  room_id?: number;

  @IsInt()
  @IsOptional()
  building_id?: number;
}
