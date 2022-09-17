import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { Card } from 'src/cards/entities/card.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Card) private cardRepo: Repository<Card>,
  ) {}

  private counter = 1;

  async findAll(): Promise<User[]> {
    return await this.userRepo.find({ relations: { ownedCards: true } });
    // return this.usersList;
  }

  async findOne(id: number): Promise<User> {
    // const user = this.usersList.find((user) => id === user.id);
    // if (!user) {
    //   throw new NotFoundException(`User with ID: ${id}. Does not exist`);
    // }s
    // return user;
    // const user = await this.userRepo.findOneBy({ id });
    const user = await this.userRepo.findOne({
      relations: { ownedCards: true, requiredCards: true },
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with ID: ${id}. Does not exist`);
    }
    return user;
  }

  async createOne(user: CreateUserDto): Promise<User> {
    // const uuid = this.counter + 1;
    // const newProduct = {
    //   id: uuid,
    //   ...user,
    // };
    // this.usersList.push(newProduct);
    // return newProduct;
    const newUser = this.userRepo.create(user);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    return this.userRepo.save(newUser);
  }

  async updateOne(id: number, changes: UpdateUserDto) {
    // const foundUserIndex = this.usersList.findIndex((user) => id === user.id);
    // const foundUser = this.usersList[foundUserIndex];
    // if (!foundUser) {
    //   throw new NotFoundException(`User with ID: ${id}. Does not exist`);
    // }
    // return (this.usersList[foundUserIndex] = {
    //   ...foundUser,
    //   ...user,
    // });
    const userDB = await this.findOne(id);
    this.userRepo.merge(userDB, changes);
    return this.userRepo.save(userDB);
  }

  async removeOne(id: number) {
    // const foundUserIndex = this.usersList.findIndex((user) => id === user.id);
    // if (!foundUserIndex) {
    //   throw new NotFoundException(`User with ID: ${id}. Does not exist`);
    // }
    // return this.usersList.splice(foundUserIndex, 1);
    return await this.userRepo.delete(id);
  }

  async addCardToUser(userId: number, cardCode: string) {
    const user = await this.userRepo.findOne({
      relations: { ownedCards: true },
      where: { id: userId },
    });
    const card = await this.cardRepo.findOne({ where: { code: cardCode } });
    if (!card) {
      throw new NotFoundException(
        `Card with cardcode: ${cardCode}. Does not exist`,
      );
    }

    user.ownedCards.push(card);
    console.log(user);

    return this.userRepo.save(user);
  }

  async addCardsRequiredByUser(userId: number, cardCode: string) {
    const user = await this.userRepo.findOne({
      where: { id: userId },
      relations: { requiredCards: true },
    });
    const card = await this.cardRepo.findOne({ where: { code: cardCode } });
    if (!card) {
      throw new NotFoundException(
        `Card with cardcode: ${cardCode}. Does not exist`,
      );
    }
    user.requiredCards.push(card);
    return this.userRepo.save(user);
  }
}
