import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email used to register  users',
  })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Username that is unique and each user has one',
  })
  readonly userName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Password used to log ing to the application',
  })
  readonly password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
