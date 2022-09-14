import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Card } from 'src/cards/entities/card.entity';

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
  @IsArray()
  @ApiProperty({
    description: 'List of cards that the user owns',
  })
  readonly ownedCards: Card[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
