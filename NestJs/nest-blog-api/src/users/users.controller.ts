import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: any) {
    return await this.usersService.findOne(id);
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: any) {
    return await this.usersService.deleteOne(id);
  }

  @Put(':id')
  async updateOne(
    @Param('id') id: any,
    @Body() updateUserDto: CreateUserDto,
  ) {
    return await this.usersService.updateOne(id, updateUserDto);
  }
}
