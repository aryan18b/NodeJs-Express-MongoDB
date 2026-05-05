import { Injectable, NotFoundException } from '@nestjs/common';
// import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';


@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>){}
    /* In-memory db
    // private readonly users : User[] = [];

    // async create(createUserDto: CreateUserDto) : Promise<User>{
    //     const ids = this.users.map(user => user.id);
    //     const max = ids.length ? Math.max(...ids) : 0;        
    //     const user : User = { id: max+1, ...createUserDto }
    //     this.users.push(user)
    //     return user;
    // }

    // async findAll() : Promise<User[]>{
    //     return this.users;
    // }

    // async findOne(id: number) : Promise<User | undefined>{
    //     const user = this.users.find(user => user.id === id);
    //     if (!user) {
    //         throw new NotFoundException(`User with id ${id} not found`);
    //     }
    //     return user;
    // }

    // async deleteOne(id: number) : Promise<User | undefined>{
    //     const index = this.users.findIndex(user => user.id === id);
    //     if(index < 0)  throw new NotFoundException(`User with id ${id} not found`);
    //     const [user] = this.users.splice(index, 1);
        
    //     return user;
    // }

    // async updateOne(id: number, updateUserDto: CreateUserDto) : Promise<User | undefined>{
    //     const index = this.users.findIndex(user => user.id === id);
    //     if(index < 0) throw new NotFoundException(`User with id ${id} not found`);

    //     const updatedUser : User = {id, ...updateUserDto};
    //     this.users[index] = updatedUser;

    //     return updatedUser;
    // }
    */

    async create(dto: CreateUserDto) : Promise<User>{
        const user = new this.userModel(dto);
        return await user.save();
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find();
    }

    async findOne(id: any) : Promise<User | undefined>{
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    async deleteOne(id: any){
        const user = await this.userModel.findByIdAndDelete(id);
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    async updateOne(id: number, updateUserDto: CreateUserDto) : Promise<User | undefined>{
        const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {returnDocument: 'after'});
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }
}
