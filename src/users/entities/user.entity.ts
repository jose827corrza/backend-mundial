import { ApiProperty } from '@nestjs/swagger';
import { Card } from 'src/cards/entities/card.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({
    description: 'Unique ID number assigned to the user',
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Email used to register  users',
  })
  @Column()
  email: string;

  @ApiProperty({
    description: 'Username that is unique and each user has one',
  })
  @Column()
  userName: string;

  @ApiProperty({
    description: 'Password used to log ing to the application',
  })
  @Column()
  password: string;

  @ApiProperty({
    description:
      'This array contains the different cards that the user already has.',
  })
  @ManyToMany(() => Card)
  @JoinTable()
  ownedCards: Card[];

  @ApiProperty({
    description:
      'This array contains the different cards that the user wants to acquire.',
  })
  @ManyToMany(() => Card)
  @JoinTable()
  requiredCards: Card[];
}
