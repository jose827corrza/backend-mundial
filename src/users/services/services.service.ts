import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/user.dto';
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
    return this.usersList.find((user) => id === user.id);
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
}
