import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [UsersModule, CardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
