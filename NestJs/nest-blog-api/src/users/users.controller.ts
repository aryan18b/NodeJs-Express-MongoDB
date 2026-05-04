import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get()
    async findAll(){
        return await this.usersService.findAll();
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto ){
        return await this.usersService.create(createUserDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: string){
        return await this.usersService.findOne(Number(id));
    }

    @Delete(':id')
    async deleteOne(@Param('id') id: string){
        return await this.usersService.deleteOne(Number(id));
    }

    @Put(':id')
    async updateOne(@Param('id') id: string, @Body() updateUserDto: CreateUserDto){
        return await this.usersService.updateOne(Number(id), updateUserDto);
    }

}
