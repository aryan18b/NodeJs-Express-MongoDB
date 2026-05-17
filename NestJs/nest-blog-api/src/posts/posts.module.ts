import { Module } from '@nestjs/common';
import { PostsController } from "./posts.controller";
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './posts.schema';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [MongooseModule.forFeature([{name: Post.name, schema: PostSchema}]), UsersModule],
    controllers: [PostsController],
    providers: [PostsService],
    exports: [PostsService]
})

export class PostsModule {}