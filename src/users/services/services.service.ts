import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  private usersList: User[] = [
    {
      id: 1,
      userName: 'joseDev',
      email: 'pepe@mail.com',
      password: '123456',
    },
  ];
  private counter = 1;

  findAll() {
    return this.usersList;
  }

  findOne(id: number) {
    const user = this.usersList.find((user) => id === user.id);
    if (!user) {
      throw new NotFoundException(`User with ID: ${id}. Does not exist`);
    }
    return user;
  }

  createOne(user: CreateUserDto) {
    const uuid = this.counter + 1;
    const newProduct = {
      id: uuid,
      ...user,
    };
    this.usersList.push(newProduct);
    return newProduct;
  }

  updateOne(id: number, user: UpdateUserDto) {
    const foundUser = this.usersList.findIndex(id);
    if (!foundUser) {
      throw new NotFoundException(`User with ID: ${id}. Does not exist`);
    }

  }
}
