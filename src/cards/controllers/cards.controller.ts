import { Controller, Get, Param, Post, Body, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCardDto } from '../dtos/card.dto';
import { Card } from '../entities/card.entity';
import { CardsService } from '../services/cards.service';

@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(private cardService: CardsService) {}

  @Get()
  getAll() {
    return this.cardService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.cardService.findOne(id);
  }

  @Post()
  createOne(@Body() payload: CreateCardDto) {
    return this.cardService.createOne(payload);
  }

  @Post('create-several')
  createSeveral(@Body() payload: CreateCardDto[]) {
    return this.cardService.createAllPlayers(payload);
  }
}
