import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from "@nestjs/common";
import { CreatePostDto } from "./dtos/create-post.dto";
import { ParseObjectIdPipe } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { PostsService } from "./posts.service";
import { UpdatePostDto } from "./dtos/update-post.dto";
import { QueryPostsDto } from "./dtos/query-posts.dto";

@Controller('posts')
export class PostsController{
    constructor(private postsService: PostsService) {}

    @Get()
    async findAll(@Query() query : QueryPostsDto){        
        return await this.postsService.findAll(query);
    }

    @Get(':id')
    async findOne(@Param('id', ParseObjectIdPipe) id: Types.ObjectId){
        const post = await this.postsService.findOne(id);        
        if(!post) throw new NotFoundException();
        return post;
    }

    @Post()
    async create(@Body() post: CreatePostDto){
        return await this.postsService.create(post);
    }

    @Put(':id')
    async update(@Param('id', ParseObjectIdPipe) id: Types.ObjectId, @Body() updatePostDto: UpdatePostDto){
        const post = await this.postsService.update(id, updatePostDto);
        if(!post) throw new NotFoundException();
        return post;
    }
    
    @Delete(':id')
    async delete(@Param('id', ParseObjectIdPipe) id: Types.ObjectId){
        const post = await this.postsService.delete(id);
        if(!post) throw new NotFoundException();
        return post;
    }
}
