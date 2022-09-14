import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Card {
  @ApiProperty({
    description: "Card's id in the API",
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "Card's id in the album",
  })
  @Column()
  code: string;

  @ApiProperty({
    description: "Player's name",
  })
  @Column()
  name: string;

  @ApiProperty({
    description: "Player's nationality",
  })
  @Column()
  country: string;
}
