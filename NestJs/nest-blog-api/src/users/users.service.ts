import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
    private readonly users : User[] = [];

    async create(createUserDto: CreateUserDto) : Promise<User>{
        const ids = this.users.map(user => user.id);
        const max = ids.length ? Math.max(...ids) : 0;        
        const user : User = { id: max+1, ...createUserDto }
        this.users.push(user)
        return user;
    }

    async findAll() : Promise<User[]>{
        return this.users;
    }

    async findOne(id: number) : Promise<User | undefined>{
        const user = this.users.find(user => user.id === id);
        return user;
    }

    async deleteOne(id: number) : Promise<User | undefined>{
        console.log(id);
        const index = this.users.findIndex(user => user.id === id);
        console.log(index);
        
        let user : User | undefined;
        if(index >= 0) {
            user = this.users.find(user => user.id === id);
            console.log(user);
            
            this.users.splice(index, 1);
        }
        
        return user;
    }

    async updateOne(id: number, updateUserDto: CreateUserDto) : Promise<User | undefined>{
        const index = this.users.findIndex(user => user.id === id);
        if(index < 0) return undefined;

        const updatedUser : User = {id, ...updateUserDto};
        this.users[index] = updatedUser;

        return updatedUser;
    }
}
