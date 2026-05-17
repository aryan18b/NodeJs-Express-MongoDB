import { IsArray, IsMongoId, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePostDto {
    @IsString()
    @MinLength(2)
    title!: string;

    @IsString()
    @MinLength(10)
    body!: string;

    @IsMongoId()
    author!: string;

    @IsOptional()
    @IsArray()
    @IsString({each: true})
    tags!: string[]
}