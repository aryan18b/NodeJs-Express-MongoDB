import { BadRequestException, Injectable } from "@nestjs/common";
import { Model, QueryFilter, Types, _QueryFilter } from "mongoose";
import { CreatePostDto } from "./dtos/create-post.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Post } from "./posts.schema";
import { UpdatePostDto } from "./dtos/update-post.dto";
import { QueryPostsDto } from "./dtos/query-posts.dto";
import { UsersService } from "src/users/users.service";

@Injectable()
export class PostsService{
    constructor(@InjectModel(Post.name) private postModel: Model<Post>, private usersService: UsersService){} 

    async findAll(query: QueryPostsDto){
        const filter : QueryFilter<Post> = {};

        if(query.author) filter.author = query.author;
        if(query.tags?.length) filter.tags = {$in : query.tags}
        
        return await this.postModel.find(filter).populate('author', '_id name');
    }

    async findOne(id: Types.ObjectId){
        return await this.postModel.findById(id).populate('author', '_id name');
    }

    async create(post: CreatePostDto) : Promise<Post> {

        const userExists = await this.usersService.findOneById(new Types.ObjectId(post.author));

        if(!userExists) throw new BadRequestException();

        const createdPost = new this.postModel(post);
        return (await createdPost.save()).populate('author', '_id name');
    }

    async update(id: Types.ObjectId, post: UpdatePostDto){
        return await this.postModel.findByIdAndUpdate(id, post, {returnDocument: 'after'}).populate('author', "_id, name");
    }

    async delete(id: Types.ObjectId){
        return await this.postModel.findOneAndDelete(id).populate('author', '_id name');
    }

}