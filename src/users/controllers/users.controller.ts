import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/user.dto';
import { User } from '../entities/user.entity';
import { UserService } from '../services/services.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Returns all the users in the application',
  })
  getAll(): User[] {
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
  getOne(@Param('id', ParseIntPipe) id: number): User {
    const user = this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID: ${id}. Does not exist`)
    }
    return this.userService.findOne(id);
  }

  @Post('create-user')
  @ApiOperation({
    summary: 'Creates an new user',
    description: 'Returns the user created',
  })
  createOne(@Body() payload: CreateUserDto): User {
    return this.userService.createOne(payload);
  }
}
