import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://aryanbhavsar95_db_user:aryan18083@cluster0.qaegiay.mongodb.net/NestJs',
    ),
    UsersModule
  ],
})
export class AppModule {}
