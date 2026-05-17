import { IsString, MinLength, IsOptional, IsArray } from "class-validator";
export class UpdatePostDto {
    @IsString()
    @MinLength(2)
    title!: string;

    @IsString()
    @MinLength(10)    
    body!: string;

    @IsOptional()
    @IsArray()
    @IsString({each: true})  
    tags!: string[];  
}