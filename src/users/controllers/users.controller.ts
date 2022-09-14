import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Returns all the users in the application',
  })
  getAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Gets an user',
    description: 'Search for an user using its unique ID',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'The user does not exist',
  })
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Creates an new user',
    description: 'Returns the user created',
  })
  createOne(@Body() payload: CreateUserDto){
    return this.userService.createOne(payload);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Updates an user',
    description: 'Returns the updated user',
  })
  updateOne(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.userService.updateOne(id, payload);
  }

  @Put(':userId/ownedcards/:cardCode')
  addCard(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('cardCode') cardCode: string,
  ) {
    return this.userService.addCardToUser(userId, cardCode);
  }
}
