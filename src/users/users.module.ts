import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from 'src/cards/entities/card.entity';
import { CardsService } from 'src/cards/services/cards.service';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Card])],
  controllers: [UsersController],
  providers: [UserService, CardsService],
})
export class UsersModule {}
