import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { NotFoundExceptionFilter } from './filters/not-found.filter';
import { QueryUsersDto } from './dtos/query-users.dto';
import { Types } from 'mongoose';
import { ParseObjectIdPipe } from '@nestjs/mongoose';

@UseFilters(NotFoundExceptionFilter)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll(@Query() query: QueryUsersDto) {    
    return await this.usersService.findAll(query);
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    const user = await this.usersService.findOneById(id);
    if(!user) throw new NotFoundException();
    return user;
  }

  @Delete(':id')
  async deleteOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    const user = await this.usersService.deleteOne(id);
    if(!user) throw new NotFoundException();
    return user;
  }

  @Put(':id')
  async updateOne(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Body() updateUserDto: CreateUserDto,
  ) {
    const user = await this.usersService.updateOne(id, updateUserDto);
    if(!user) throw new NotFoundException();
    return user;
  }
}
