import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Card's id in the album",
  })
  readonly code: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Player's name",
  })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "Player's nationality",
  })
  readonly country: string;
}

export class UpdateCardDto extends PartialType(CreateCardDto) {}
