import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCardDto } from '../dtos/card.dto';
import { Card } from '../entities/card.entity';

@Injectable()
export class CardsService {
  constructor(@InjectRepository(Card) private cardRepo: Repository<Card>) {}
  private count = 1;
  private cardsList: Card[] = [
    {
      id: 1,
      code: 'ARG01',
      name: 'Lionel Messi',
      country: 'Argentina',
    },
  ];

  async findAll() {
    // return this.cardsList;
    return await this.cardRepo.find();
  }

  async findOne(id: number) {
    // return this.cardsList.find((player) => id === player.name);
    return await this.cardRepo.findOne({ where: { id: id } });
  }

  async createOne(player: CreateCardDto) {
    // const uuid = (this.count += 1);
    // const newPlayer = {
    //   id: uuid,
    //   ...player,
    // };
    // this.cardsList.push(newPlayer);
    // return newPlayer;
    const newCard = this.cardRepo.create(player);
    return await this.cardRepo.save(newCard);
  }

  async createAllPlayers(players: CreateCardDto[]) {
    // players.forEach((player) => {
    //   const newPlayer = {
    //     id: (this.count += 1),
    //     ...player,
    //   };
    //   this.cardsList.push(newPlayer);
    // });
    // return players;
    const newCards = await this.cardRepo.create(players);
    return await this.cardRepo.save(newCards);
  }

  //No creo el crud completo, no creo los usemos
}
