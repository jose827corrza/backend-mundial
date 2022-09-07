import { Injectable } from '@nestjs/common';
import { CreateCardDto } from '../dtos/card.dto';
import { Card } from '../entities/card.entity';

@Injectable()
export class CardsService {
  private count = 1;
  private cardsList: Card[] = [
    {
      id: 1,
      code: 'ARG01',
      name: 'Lionel Messi',
      country: 'Argentina',
    },
  ];

  findAll() {
    return this.cardsList;
  }

  findOne(id: string) {
    return this.cardsList.find((player) => id === player.name);
  }

  createOne(player: CreateCardDto) {
    const uuid = (this.count += 1);
    const newPlayer = {
      id: uuid,
      ...player,
    };
    this.cardsList.push(newPlayer);
    return newPlayer;
  }

  createAllPlayers(players: CreateCardDto[]) {
    players.forEach((player) => {
      const newPlayer = {
        id: (this.count += 1),
        ...player,
      };
      this.cardsList.push(newPlayer);
    });
    return players;
  }

  //No creo el crud completo, no creo los usemos
}
