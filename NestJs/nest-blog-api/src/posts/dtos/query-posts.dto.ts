import { Transform } from "class-transformer";
import { IsArray, IsMongoId, IsOptional, IsString } from "class-validator";

export class QueryPostsDto {
    @IsOptional()
    @IsMongoId()
    author!: string;

    @IsOptional()
    @Transform(({value}) => value.split(',').map((tag: string) => tag.trim()))
    @IsArray()
    @IsString({ each: true })
    tags!: string[];
}