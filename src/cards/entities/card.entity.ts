import { ApiProperty } from '@nestjs/swagger';

export class Card {
  @ApiProperty({
    description: "Card's id in the API",
  })
  id: number;

  @ApiProperty({
    description: "Card's id in the album",
  })
  code: string;

  @ApiProperty({
    description: "Player's name",
  })
  name: string;

  @ApiProperty({
    description: "Player's nationality",
  })
  country: string;
}
